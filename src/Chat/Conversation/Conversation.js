import { FormControl, InputAdornment, TextField } from "@mui/material"; // import { FormControl, InputAdornment, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Picture from "../../../src/Assests/Img/eruka.png";
import {
  ClearChat,
  getChatByUser,
  // getSingleUser,
  sendMessage,
} from "../../redux/Slice/chatSlice";
import "../Chat.css";
import { ColorOptions, TextColor } from "../../Constants/Constant";

const Conversation = ({ closeMessage, data, formatTimestamp }) => {
  const [message, setMessage] = useState("");
  const lastMessageRef = useRef(null);
  const getChats = useSelector((state) => state.chat.chatsData);
  const dispatch = useDispatch();

  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Trigger click event for the IoSendSharp icon
      sendButtonClick();
    }
  };

  const sendButtonClick = () => {
    if (message.trim().length > 0) {
      dispatch(sendMessage({ message: message, userId: 3 }, data?.chatId));
      setMessage("");
    }
  };
  useEffect(() => {
    dispatch(getChatByUser(data?.chatId));
    return () => {
      dispatch(ClearChat());
    };
  }, [data, dispatch]);

  useEffect(() => {
    // Scroll to the last message when the component mounts or when a new message is added
    if (lastMessageRef.current) {
      // lastMessageRef.current.scrollTo(0)
    }
  }, []);
  // var y = window.scrollY;
  useEffect(() => {
    var element = document.getElementById("ref");
    window.scroll({
      top: element.scrollHeight,
      left: 0,
    });
  }, [message]);

  return (
      <div id="ref" className="parent_conversation_individual">
          <div className="back_profile">
              <div className="back" onClick={closeMessage}>
                  <BiArrowBack style={{ height: "1rem", width: "auto" }} />
                  <p>Back</p>
              </div>
              <div className="profile_name_satus">
                  <div className="profileImg">
                      <img src={Picture} className="img" alt="" />
                  </div>
                  <div>
                      <div className="profile_chat_with_id">
                          {/* {data?.firstName + "   " + data?.lastName} */}
                          {data?.name?.split("|")[0].trim()}
                      </div>
                      <div className="last_message">Online</div>
                  </div>
              </div>
          </div>
          {/* all messages  */}
          <div className="messages">
              <main className="msger-chat">
                  {getChats &&
                      getChats.length > 0 &&
                      getChats
                          ?.slice()
                          .reverse()
                          .map((chats, index) => {
                              return (
                                  <div
                                      key={index}
                                      ref={index === 0 ? lastMessageRef : null}
                                      className={chats.userId === 3 ? "msg right-msg" : "msg left-msg"}
                                  >
                                      <div
                                          className="msg-bubble"
                                          style={{
                                              backgroundColor: chats.userId === 3 && BackgroundColor,
                                              color: chats.userId === 3 &&(  BackgroundColor === ColorOptions.YELLOW
                                                      ? TextColor.BLACK
                                                      : TextColor.WHITE),
                                          }}
                                      >
                                          <div className="msg-text">
                                              {chats.image && <img src="" className="msg_img" alt="" />}
                                              <p className="msg_desc">{chats.message}</p>
                                          </div>
                                          <div
                                              className={
                                                  chats.userId !== 3
                                                      ? "msg-info-time"
                                                      : "msg-info-time_sender"
                                              }
                                          >
                                              {formatTimestamp(chats?.timestamp)}
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}

                  {/* {getChats &&
            getChats.length > 0 &&
            getChats?.map((chats, index) => {
              return (
                <div ref={index === getChats.length - 1 ? lastMessageRef : null}
                  className={chats.userId === 3 ? "msg right-msg" : "msg left-msg"}
                >
                  <div class="msg-bubble">
                    <div class="msg-text">
                      {chats.image && <img src="" className="msg_img" alt="" />}
                      <p className="msg_desc">{chats.message}</p>
                    </div>
                    <div
                      className={
                        chats.userId !== 3
                          ? "msg-info-time"
                          : "msg-info-time_sender"
                      }
                    >
                      {formatTimestamp(chats?.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })} */}
              </main>
          </div>
          <div className="write_messages">
              <div className="attachment">
              <ImAttachment />
              </div>
              <div className="send_message">
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
                          // label={label}
                          variant="outlined"
                          placeholder="Message"
                          value={message}
                          // fullWidth
                          onChange={(e) => {
                              setMessage(e.target.value);
                          }}
                          onKeyDown={handleKeyDown}
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IoSendSharp
                                          className="search-icon"
                                          onClick={sendButtonClick}
                                          // onClick={() => {
                                          //   dispatch(
                                          //     sendMessage(
                                          //       { message: message, userId: 3 },
                                          //       data?.chatId
                                          //     )
                                          //   );
                                          //   setMessage("");
                                          // }}
                                      />
                                  </InputAdornment>
                              ),
                          }}
                      />
                  </FormControl>
              </div>
          </div>
      </div>
  );
};

export default Conversation;