import { Box, Divider, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyTasksTable from "./MyTasksTable";
// import { ReactComponent as SettingIcon } from "../../Assests/SVG/setting-4.svg";
import BackdropLoader from "../../Components/Loader/BackdropLoader";
import { sideBarListColor } from "../../Constants/Constant";
import NoDataFound from "../../Pages/NoDataFound";
import { getTasksList } from "../../Services/TID/myTasks.service";
import {
  getTaskListData,
  getTasksLoading,
} from "../../redux/Slice/TID/myTasksSlice";
import CommonSearchHeader from "../TID/intelFlow/CommonSearchHeader";
import TaskFilters from "./TaskFilters";
import "./myTask.css";

const MyTaskScreen = () => {
  const dispatch = useDispatch();

  const tasksListData = useSelector(getTaskListData);
  const tasksLoading = useSelector(getTasksLoading);

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((pre) => !pre);
  };

  useEffect(() => {
    dispatch(getTasksList());
  }, [dispatch]);

  return (
    <>
      <BackdropLoader loading={tasksLoading} />
      <div className="task-main-container">
        <div className="mytask-header">
          <div> My Tasks</div>
          <div>
            <CommonSearchHeader />
            {/* <CustomOutlinedInput
                            className="tab-search-input"
                            // onChange={(e) => {
                            //   setSearchValue(e.target.value);
                            //   searchBarChange(e);
                            // }}
                            // value={searchValue}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fill: "#8E97A4" }} />
                                </InputAdornment>
                            }
                            placeholder="Search anything"
                        /> */}
          </div>
        </div>
        <Divider
          sx={{
            background: "#1E2B40",
            borderWidth: "1px",
          }}
        />
        <div className="task-main-section">
          <div className="mytask-header">
            <div className="remediations-main-section-header-name">
              <span>All Tasks</span>
            </div>
            <div className="remediations-main-section-filter">
              {/* <CustomTooltip title="Filter">
                                <IconButton className="task-filter-button" onClick={toggleDrawer}>
                                    <SettingIcon />
                                </IconButton>
                            </CustomTooltip> */}
            </div>
          </div>
          <Divider
            sx={{
              background: "#1E2B40",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              borderWidth: "1px",
            }}
          />
          <div>
            {tasksListData && tasksListData.length > 0 ? (
              <>
                <MyTasksTable tableData={tasksListData} />
              </>
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
      </div>
      <Drawer
        style={{ margin: "2rem" }}
        id="tid-filter-drawer"
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: `${sideBarListColor.BACKGROUND_COLOR} !important`,
            color: `${sideBarListColor.TEXT} !important`,
            margin: "1rem",
            border: "0.063rem solid #1E2B40",
            borderRadius: "0.375rem",
            height: "95%",
            width: "20%",
          },
        }}
        className="filter-drawer"
        open={open}
        anchor="right"
        onClose={toggleDrawer}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "1rem",
          }}
        >
          <TaskFilters
            toggleDrawer={toggleDrawer}
            // handleFiltersClick={handleFiltersClick}
            // onApplyFilterClick={onApplyFilterClick}
            // cleareFilterObject={cleareFilterObject}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default MyTaskScreen;
