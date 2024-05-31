import { FormControl, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import GroupDp from "../../src/Assests/Img/group_dp.png";
import Picture from "../../src/Assests/Img/eruka.png";
import { addGroup, getAllUsers } from "../redux/Slice/chatSlice";
import "./Chat.css";
import DynamicButton from "../Components/Button/ButtonBox";
const CreateGroup = ({ closeAddGroup }) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.chat.allUsersForChat);
  // const getUser = useSelector((state) => state.chat.user);
  const [groupName, setGroupName] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);

  const handleCreateName = (e) => {
    const name = e.target.value;
    setGroupName(name);
  };
  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredUsers = allUsers.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm)
    );
    setSearchedUser(filteredUsers);
  };

  const handleAddGroup = () => {
    const payload = { name: groupName };
    dispatch(addGroup(payload));
    setGroupName("");
    closeAddGroup();
  };
  useEffect(() => {
dispatch(getAllUsers())
setSearchedUser(allUsers);
  }, [dispatch,allUsers])
  

  return (
    <div className="main-create-group">
      <div className="back_create">
        <div className="back" onClick={closeAddGroup}>
          <BiArrowBack style={{height:"1rem" ,width:"auto"}} />
          <p>Back</p>
        </div>
        <div className="create_btn" onClick={handleAddGroup}>
          {/* <ButtonComponent
            className="download-button"
            //   onClick={handleClick}
            style={{
              backgroundColor: "rgba(62, 107, 247, 1)",
              color: "white",
              boxShadow: "none",
              // backgroundColor: BackgroundColor || selectedColor,
              // color: BackgroundColor === "#d7f429" ? "#000" : "#fff",
            }}
          >
            Create
          </ButtonComponent> */}

          <DynamicButton            label="CREATE" />
        </div>
      </div>

      <div className="addgroup_main_content">
        <div className="add_groupname">
          <div className="dp_group">
            <div className="add_group_dp">
              <img src={GroupDp} className="img_for_groupdp" alt="" />
            </div>
            <div>
              <TextField
                id="standard-disabled"
                label="Group Name"
                value={groupName}
                onChange={handleCreateName}
                variant="standard"
              />
            </div>
          </div>
        </div>

        <div className="search_select_user">
          <div style={{flex: 1,maxHeight: "60px"}}>
            {" "}
            <FormControl
              sx={{
                m: 1,
                minWidth: 200,
                height: "48px",
                width: "96%",
              }}
              size="small"
            >
              <TextField
                id="outlined-basic"
                className="elementSearch"
                // label={label}
                variant="outlined"
                placeholder="Name"
                // value={groupName}
                // fullWidth
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AiOutlineSearch className="search-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>
          <div className="all_users_foradd" style={{  height: "82%",
  flex: 1}}>
            {/* profile and checkbox */}
            {searchedUser &&
              searchedUser?.length > 0 &&
              searchedUser?.map((value) => {
              return <div className="profile_checkbox">
                  <div className="profileDetails_chat_checkbox">
                    <div className="profileImg">
                      <img src={Picture} className="img" alt="" />
                    </div>
                    <div>
                      <div className="profile_chat_with_id">
                        
                       {value?.firstName + " " + value?.lastName}
                      </div>
                      <div className="last_message">Online</div>
                    </div>
                  </div>
                  <div className="checkIcon">
                    <span>
                      <input
                        type="checkbox"
                        style={{
                          width: "15px",
                          height: "15px",
                          backgroundColor: "white",
                          cursor: "pointer",
                          marginRight: "10px",
                          outline: "none",
                          border: "1px solid red",
                        }}
                      
                      />
                    </span>
                  </div>
                </div>
            })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
