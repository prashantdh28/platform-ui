import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import React, { useEffect, useState } from "react";
import "../Investigation/Components/Sidebars/RightSidebar/RightBar.css";
import "./Chat.css";
import { FormControl, InputAdornment, TextField } from "@mui/material"; // import { FormControl, InputAdornment, TextField } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import Picture from "../../src/Assests/Img/eruka.png";
import Conversation from "./Conversation/Conversation";
import CreateGroup from "./CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import GroupChat from "./Conversation/GroupChat";
import {
  connectStomp,
  disconnectStomp,
  getUsersForChat,
  subscribeToChat,
  unsubscribeFromChat,
} from "../redux/Slice/chatSlice";
import { ColorOptions, TextColor } from "../Constants/Constant";

const ChatToggle = ({ setIsChatOpen, showBackdrop, onCreate }) => {
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.chat.user);
  const [openMessage, setOpenMessage] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [addGroup, setAddGroup] = useState(false);
  const [openGroupChat, setOpenGroupChat] = useState(false);
  const [searchedUser, setSearchedUser] = useState([]);
  // const [messages ,setMessages] = useState([]);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

  // let sidebarObj;

  const handleClose = () => {
    setIsChatOpen(false);
    // setVisible(false);
    // onClose();
  };

  const handleButtonClick = (user) => {
    dispatch(subscribeToChat(user?.chatId));
    setUserdata(user);
    setOpenMessage(true);
    setAddGroup(false);
    setOpenGroupChat(false);
  };

  const groupChats = (user) => {
    dispatch(subscribeToChat(user?.chatId));
    setUserdata(user);
    setOpenGroupChat(true);
    setAddGroup(true);
    setOpenMessage(true);
  };

  const closeGroup = () => {
    setOpenGroupChat(false);
    setAddGroup(false);
    setOpenMessage(false);
    dispatch(getUsersForChat());
    dispatch(unsubscribeFromChat());
  };

  const closeMessage = () => {
    setOpenMessage(false);
    dispatch(getUsersForChat());
    dispatch(unsubscribeFromChat());
  };
  const openAddGruop = () => {
    setAddGroup(true);
    setOpenMessage(true);
  };
  const closeAddGroup = () => {
    setAddGroup(false);
    setOpenMessage(false);
  };
  // var searchedUser = [];
  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredUsers = getUser.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
    setSearchedUser(filteredUsers);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const getLastChatMessage = (user) => {
    const lastChat = user?.chats?.reduce((prevChat, currentChat) => {
      if (currentChat?.messages?.length > 0) {
        const lastMessage = currentChat.messages.slice(-1)[0];
        return !prevChat || lastMessage.timestamp > prevChat.timestamp
          ? lastMessage
          : prevChat;
      }
      return prevChat;
    }, null);

    return lastChat ? lastChat.message : "No messages available";
  };

  useEffect(() => {
    dispatch(getUsersForChat());
    setSearchedUser(getUser);
  }, [getUser, dispatch]);

  useEffect(() => {
    dispatch(connectStomp());
    return () => {
      dispatch(disconnectStomp());
    };
  }, [dispatch]);

  return (
    <>
      <SidebarComponent
        position="Right"
        width="420px"
        id="right-sidebar_chat"
        // ref={(Sidebar) => (sidebarObj = Sidebar)}
        created={onCreate}
        showBackdrop={showBackdrop}
        className="main-sidebar"
        enableGestures={false}
        // className={openMessage ? "main-sidebar-addgroup" : "main-sidebar"}
      >
        <div
          className="title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            backgroundColor: BackgroundColor,
            color:
              BackgroundColor === ColorOptions.YELLOW
                ? TextColor.BLACK
                : TextColor.WHITE,
          }}
        >
          Chat
          <span className="choose-style-icon">
            <BsXLg onClick={handleClose} />
          </span>
        </div>
        {/* Cenversation page  */}

        {
          // getUser[0].chatType === "INDIVIDUAL"
          openMessage ? (
            addGroup ? (
              openGroupChat ? (
                <GroupChat
                  data={userdata}
                  formatTimestamp={formatTimestamp}
                  closeGroup={closeGroup}
                />
              ) : (
                <CreateGroup closeAddGroup={closeAddGroup} />
              )
            ) : (
              <Conversation
                data={userdata}
                formatTimestamp={formatTimestamp}
                closeMessage={closeMessage}
              />
            )
          ) : (
            <div className="main_content">
              <div className="add_and_search">
                <div className="chat_search">
                  <FormControl
                    sx={{
                      m: 1,
                      minWidth: 200,
                      height: "48px",
                      width: "100%",
                    }}
                    size="small"
                  >
                    <TextField
                      id="outlined-basic"
                      className="elementSearch"
                      label="Search"
                      variant="outlined"
                      placeholder="Name..."
                      // value={value}
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
                <div className="chat_add_user tooltip" onClick={openAddGruop}>
                  <BiPlusCircle style={{ color: BackgroundColor }} />
                  <span
                    className="tooltiptext"
                    style={{
                      backgroundColor: BackgroundColor,
                      color:
                        BackgroundColor === ColorOptions.YELLOW
                          ? TextColor.BLACK
                          : TextColor.WHITE,
                    }}
                  >
                    Create a Group
                  </span>
                </div>
                <div></div>
              </div>

              {searchedUser &&
                searchedUser?.length > 0 &&
                searchedUser?.map((user, index) => (
                  <div
                    className="profileDetails_chat"
                    key={index}
                    // onClick={()=>dispatch(getSingleUser(user?.id))}
                    onClick={
                      user?.chatType === "INDIVIDUAL"
                        ? () => handleButtonClick(user)
                        : () => groupChats(user)
                    }

                    //onClick={groupChats}
                  >
                    <div style={{ display: "flex", gap: " 12px" }}>
                      <div className="profileImg">
                        <img src={Picture} className="img" alt="" />
                      </div>
                      <div className="profile_chat">
                        {/* {user?.firstName + "   " + user?.lastName} */}
                        {user?.name?.split("|")[0].trim()}
                        <div className="last_message">
                          {/* {user?.chats[user.chats.length - 1]?.messages?.length >
                        0
                          ? user?.chats[user.chats.length - 1]?.messages[
                              user?.chats[user.chats.length - 1]?.messages
                                ?.length - 1
                            ]?.message
                          : ""} */}
                          {getLastChatMessage(user)}
                        </div>
                      </div>
                    </div>

                    <div className="parent-msg-time">
                      <span className="msg-info-time">
                        {/* {user?.chats[user?.chats?.length - 1]?.messages?.length > 0
                  ? formatTimestamp(
                      user?.chats[user?.chats?.length - 1].messages[
                        user?.chats[user?.chats?.length - 1]?.messages?.length - 1
                      ].timestamp
                    )
                  : ""} */}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )
        }

        {/* For add group or user  */}
      </SidebarComponent>
    </>
  );
};

export default ChatToggle;
