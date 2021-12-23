import React, { useContext, useState, useRef } from "react";
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/coversation/Conversation";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/chatonline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
const Messenger = () => {
  //get the current user
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  //useRef for messagescroll
  const scrollRef = useRef();
  //message sender handler
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://amarsocial.herokuapp.com/api/messages`,
        {
          sender: user._id,
          conversationId: currentChat,
          text: newMessage,
        }
      );

      setNewMessage("");
    } catch (error) {}
  };

  //fetching the conversation of the current user
  useEffect(() => {
    const fetchConversations = async () => {
      console.log(user._id);
      try {
        const response = await axios.get(
          `https://amarsocial.herokuapp.com/api/conversations/${user._id}`
        );

        setConversations(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, []);
  //fetching all messages of the current conversation
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        `https://amarsocial.herokuapp.com/api/messages/${currentChat?._id}`
      );
      setMessages(response.data);
      console.log(response.data);
    };
    fetchMessages();
  }, [currentChat, messages]);
  //useEffect for scrolling into the recent messages
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends..."
              className="chatMenuInput"
            />
            {conversations.map((item) => {
              return (
                <div onClick={() => setCurrentChat(item)}>
                  <Conversation
                    key={item._id}
                    conversation={item}
                    currentUser={user._id}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((item) => {
                    return (
                      <div ref={scrollRef}>
                        <Message
                          message={item}
                          own={item.sender === user._id}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write a message...."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button className="chatSubmitBtn" onClick={handleMessage}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Open a Conversation to start chatting...
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
