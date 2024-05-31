import Picture from "../../../src/Assests/Img/eruka.png";
// import Line from "../../Img/Chat/Rectangle 2593.png";
import cat from "../../../src/Assests/Img/group_dp.png";
// import Smith from "../../Img/Chat/smith.png";
import { FormControl, InputAdornment, TextField } from "@mui/material"; // import { FormControl, InputAdornment, TextField } from "@mui/material";
import { IoSendSharp } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { BiArrowBack } from "react-icons/bi";
import "../Chat.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ClearChat, getChatByUser, sendMessage } from "../../redux/Slice/chatSlice";
import { ColorOptions, TextColor } from "../../Constants/Constant";

const GroupChat = ({ closeGroup, data,formatTimestamp }) => {
  const [message, setMessage] = useState("");
  const getChats = useSelector((state) => state.chat.chatsData);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Trigger click event for the IoSendSharp icon
      sendButtonClick();
    }
  };

  const sendButtonClick = () => {
    if (message.trim().length > 0) {
      dispatch(sendMessage  ({ message: message, userId: 3 }, data?.chatId));
      setMessage("");
    }
  };
  useEffect(() => {
    dispatch(getChatByUser(data?.chatId));
    return(()=>{
      dispatch(ClearChat())
    })


  }, [data, dispatch]);

  return (
      <div className="parent_conversation">
          <div className="back_profile">
              <div className="back" onClick={closeGroup}>
                  {" "}
                  <BiArrowBack style={{ height: "1rem", width: "auto" }} />
                  <p>Back</p>{" "}
              </div>
              <div className="profile_name_satus">
                  <div className="profileImg">
                      <img src={Picture} className="img" alt="" />
                  </div>
                  <div>
                      <div className="profile_chat_with_id"> {data?.name}</div>
                      <div className="last_message">20 members</div>
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
                                  <div className={chats.userId === 3 ? "msg right-msg" : "msg left-msg"}>
                                      {chats.userId !== 3 ? (
                                          <div className="msg-img">
                                              <img src={Picture} className="img" alt="" />
                                          </div>
                                      ) : (
                                          ""
                                      )}

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
                                              {chats.image && <img src={cat} className="msg_img" alt="" />}
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

                  {/* replied message ui */}

                  {/* <div class="msg left-msg">
            <div class="msg-img">
              <img src={Picture} className="img" alt="" />
            </div>
            <div class="msg-bubble">
              <div class="msg-text"> 
              <div className="line_replied">

               <img src={Line} className="line_svg" alt="" />
                <div className="reply_chat">
              
                  <div className="you">You</div>
                   <div>Can I come over?</div>{" "}
                </div>
              </div>

                <p className="msg_desc">
                Of course, let me know if you're on your way
                </p>
              </div>
              <div class="msg-info-time">12:45</div>
            </div>
          </div> */}
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
                          height: "40px",
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
                          // onChange={handleChange}
                          onChange={(e) => {
                              setMessage(e.target.value);
                          }}
                          onKeyDown={handleKeyDown}
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IoSendSharp className="search-icon" onClick={sendButtonClick} />
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

export default GroupChat;
