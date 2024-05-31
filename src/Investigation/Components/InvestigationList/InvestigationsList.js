import React, { useEffect, useState } from "react";
import "./InvestigationsList.css";
import ElementNodeDark from "../../../../src/Assests/Img/element_node_dark.png";
import ElementNode from "../../../../src/Assests/Img/element_node.png";
import { Input } from "@mui/material";
import { MenuItem } from "@mui/material";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteInvestigations,
  getAllInvestigations,
  getSingleInvestigations,
  updateInvestigationData,
  OpenInvestigationsTab,
  searchInvestigation,
  loadingflag,
} from "../../../redux/Slice/investigationSlice";
import { setActiveTab, updateTabsData } from "../../../redux/Slice/tabSlice";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import useToastify from "../../../Hooks/useToastify";
import { DialogUtility } from "@syncfusion/ej2-react-popups";
import { useDebounce } from "../../../Hooks/useDebouncedValue";

const InvestigationsList = () => {
  const dispatch = useDispatch();
  const { showToast } = useToastify();
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  // const [isEditingFilename, setIsEditingFilename] = useState(false);
  const [nameError, setNameError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const backgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const select = useSelector((state) => state.theme.theme);
  const AllInvestigationData = useSelector(
    (state) => state.investigation?.allinvestigationsdata
  );
  const totalElements = useSelector(
    (state) => state.investigation?.totalElements
  );
  const OpenInvestigations = useSelector(
    (state) => state.investigation?.openInvestigations
  );

  const isLoading = useSelector((state) => state.investigation?.loading);

  const [isPopupOpen, setIsPopupOpen] = useState([]);

  const MenusHandler = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopupOpen((prevState) => {
      const newPopupState = [...prevState];
      newPopupState[id] = !prevState[id];
      return newPopupState;
    });
    setEditableIndex(null);
    setNameError("");
  };

  const imgHandler = (img) => {
    return select === "light-theme" ? img : ElementNodeDark;
  };

  const activeTabId = useSelector((state) => state.tabs.activeTabId);

  const SingleInvestigation = (id, name) => {
    const maxTabs = 10; // Maximum number of tabs allowed

    dispatch(getSingleInvestigations(id));

    const isIdAlreadyAdded = OpenInvestigations.some((tab) => tab.id === id);

    if (isIdAlreadyAdded) {
      // If the investigation is already in OpenInvestigations, navigate to the tab
      dispatch(setActiveTab(id));
    } else {
      if (OpenInvestigations.length < maxTabs) {
        if (activeTabId === id) {
          dispatch(updateTabsData([]));
        } else {
          const updatedOpenInvestigationsdata = [
            ...OpenInvestigations.filter((tab) => tab?.status !== "DELETED"),
            { id: id, text: `${name ? name : "Investigation " + id}` },
          ];

          dispatch(OpenInvestigationsTab(updatedOpenInvestigationsdata));

          // showToast("Tab added successfully");
        }
        dispatch(setActiveTab(id));
      } else {
        showToast("You can have a maximum of 10 open tabs");
      }
    }
  };

  const statusMenu = [
    {
      label: "Approved",
      value: "APPROVED",
    },
    {
      label: "Draft",
      value: "DRAFT",
    },
    {
      label: "Amendment",
      value: "AMENDMENT",
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "draft":
        return "draft";
      case "approved":
        return "approved";
      case "review":
        return "inreview";
      case "amendment":
        return "amendment";
      default:
        return "";
    }
  };

  useEffect(() => {
    dispatch(getAllInvestigations());
  }, [dispatch]);

  const formatTimeDifference = (timestamp) => {
    const now = new Date();
    const updatedTime = new Date(timestamp);
    const timeDifference = Math.floor((now - updatedTime) / 1000);

    const minutes = Math.floor((timeDifference / 60) % 60);
    const hours = Math.floor((timeDifference / 3600) % 24);
    const days = Math.floor(timeDifference / (3600 * 24));

    if (days > 0) {
      return `Edited ${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `Edited ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `Edited ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "Just now";
    }
  };

  const renameHandling = async (e, id) => {
    e.stopPropagation();

    if (editableIndex === id) {
      const investigationData = AllInvestigationData.find(
        (item) => item.id === id
      );

      // Check if the editedName is not an empty string
      if (editedName.trim() !== "") {
        const payload = {
          name: editedName,
          content: investigationData?.content,
        };
        dispatch(loadingflag);

        // Dispatch the update action
        await dispatch(updateInvestigationData(id, payload, showToast));

        // Set state to close the popup after the update
        setIsPopupOpen((prevState) => {
          const newPopupState = [...prevState];
          newPopupState[id] = false;
          return newPopupState;
        });

        // Reset editable index and editing flag
        setEditableIndex(null);
        // setIsEditingFilename(false);
        // Clear any previous name error message
        setNameError("");
      } else {
        setNameError("Name cannot be empty");
      }
    } else {
      setEditableIndex(id);
      setEditedName(
        AllInvestigationData.find((item) => item.id === id)?.name || ""
      );
      // setIsEditingFilename(true);
    }
  };

  const deleteHandler = async (id, showToast) => {
    try {
      const dialog = await DialogUtility.confirm({
        animationSettings: { effect: "Zoom" },
        cancelButton: {
          text: "Cancel",
          click: () => {
            if (dialog) {
              dialog.close();
              setIsPopupOpen((prevState) => {
                const newPopupState = [...prevState];
                newPopupState[id] = false;
                return newPopupState;
              });
            }
          },
        },
        closeOnEscape: true,
        content: "Are you sure you want to remove this Investigation?",
        okButton: {
          text: "Delete",
          click: () => {
            if (dialog) {
              dialog.close();
              dispatch(DeleteInvestigations(id, showToast));

              const updatedOpenInvestigations = OpenInvestigations.filter(
                (tab) => tab.id !== id
              );
              dispatch(OpenInvestigationsTab(updatedOpenInvestigations));
            }
          },
        },
        showCloseIcon: true,
        title: "Are you sure ?",
      });
    } catch (error) {
      console.error("Error deleting investigation:", error);
    }
  };

  const onSearchChange = useDebounce((value, setValue) => {
    if (value || status) {
      dispatch(
        searchInvestigation({ search: value, status, size: totalElements })
      );
    } else {
      dispatch(getAllInvestigations());
    }
    setValue(value);
  }, 300);

  const onStatusChange = (value, setValue) => {
    if (value || searchValue) {
      dispatch(
        searchInvestigation({
          search: searchValue,
          status: value,
          size: totalElements,
        })
      );
    } else {
      dispatch(getAllInvestigations());
    }
    setValue(value);
  };

  return (
      <>
          {isLoading && <SpinnerLoader />}

          <div className="container">
              <div className="first_container">
                  <div className="status_sort_btn">
                      <div className="status_btn ">
                          <TextField
                              id="outlined-basic"
                              onChange={(e) => onSearchChange(e.target.value, setSearchValue)}
                              label="Search"
                              variant="outlined"
                              InputLabelProps={{
                                  style: {
                                      color: backgroundColor,
                                  },
                              }}
                          />
                          {/* <DropDownTree options={menu} Lable={Lable} size="small" /> */}
                      </div>
                      <div className="status_btn">
                          <TextField
                              id="outlined-select"
                              select
                              defaultValue=""
                              onChange={(e) => onStatusChange(e.target.value, setStatus)}
                              label="Select status"
                              fullWidth
                              InputLabelProps={{
                                  style: {
                                      color: backgroundColor,
                                  },
                              }}
                          >
                              <MenuItem value="">Select</MenuItem>
                              {statusMenu.map((option, index) => {
                                  return (
                                      <MenuItem key={index} value={option.value}>
                                          {option.label}
                                      </MenuItem>
                                  );
                              })}
                          </TextField>
                          {/* <DropDownTree options={menu} Lable="Sort" size="small" /> */}
                      </div>
                  </div>
              </div>
              {isLoading && <SpinnerLoader />}
              <div className="grid-main">
                  {!isLoading &&
                      AllInvestigationData &&
                      AllInvestigationData.length > 0 &&
                      AllInvestigationData.filter((inv) => inv?.status !== "DELETED").map((list) => {
                          const content = list.content ? JSON.parse(list.content) : null;
                          console.log(
                              content,
                              "content________________________________________________________________"
                          );
                          return (
                              <div className={`grid-item ${getStatusColor(list.status)}`} key={list.id}>
                                  <div
                                      className="show_status"
                                      onClick={() => SingleInvestigation(list?.id, list?.name)}
                                  >
                                      <img
                                          alt=""
                                          className="elementNode"
                                          src={imgHandler(ElementNode)}
                                          // src={list?.snapshot}
                                      />
                                      <div className={`status-badge ${getStatusColor(list.status)}`}>
                                          {list?.status}
                                      </div>
                                  </div>
                                  <div className="file_info">
                                      {editableIndex === list.id ? (
                                          <>
                                              <Input
                                                  type="text"
                                                  value={editedName}
                                                  onChange={(e) => {
                                                      e.stopPropagation();
                                                      setEditedName(e.target.value.trim());
                                                      // Clear the name error message when the user types
                                                      setNameError("");
                                                  }}
                                              />
                                              {nameError && <div className="error-message">{nameError}</div>}
                                          </>
                                      ) : (
                                          <div>{list?.name} </div>
                                      )}
                                      <div onClick={(e) => MenusHandler(e, list.id)}>
                                          <BsThreeDots className="option" />
                                      </div>
                                  </div>
                                  {isPopupOpen[list.id] && (
                                      <div
                                          className="popup"
                                          style={{
                                              position: "absolute",
                                              width: "188px",
                                              height: "80px",
                                              bottom: -70,
                                              right: 20,
                                              zIndex: 100,
                                              background: "#fff",
                                              padding: "16px",
                                              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                          }}
                                      >
                                          <div>
                                              <div
                                                  className="renameFile"
                                                  onClick={(e) => renameHandling(e, list.id)}
                                              >
                                                  <div>Rename</div>
                                                  <div>
                                                      <MdModeEdit />
                                                  </div>{" "}
                                              </div>

                                              <div
                                                  className="deleteFile"
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      deleteHandler(list.id);
                                                  }}
                                              >
                                                  <div>Delete</div>
                                                  <div>
                                                      <MdDelete />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  )}
                                  <div className="editedTime">
                                      {formatTimeDifference(list?.lastUpdatedDate)}
                                  </div>
                              </div>
                          );
                      })}
              </div>
              {!isLoading &&
                  (!AllInvestigationData ||
                      !(AllInvestigationData.length > 0) ||
                      !(AllInvestigationData.filter((inv) => inv?.status !== "DELETED").length > 0)) && (
                      <p className="noData">No Data Found</p>
                  )}
          </div>
      </>
  );
};

export default InvestigationsList;
