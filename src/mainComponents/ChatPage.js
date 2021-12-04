import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react';
import Contact from '../components/contact';
import Message from '../components/message';

const ChatPage = ({ users, setUsers }) => {
  useEffect(() => {
    let eventSourceUsers = new EventSource(
      `http://localhost:8080/users?username=${sessionStorage.getItem(
        'username'
      )}`
    );
    let eventSourceMessage = new EventSource(`http://localhost:8080/message`);
    eventSourceUsers.onmessage = (e) => {
      setUsers((prevUsers) => {
        const users = JSON.parse(e.data);
        toast.info(users.username, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return users.length ? users : [...prevUsers, users];
      });
    };
    eventSourceMessage.onmessage = (e) => {
      setMessages((prevMessages) => {
        const messages = JSON.parse(e.data);

        return messages.length ? messages : [...prevMessages, messages];
      });
    };
  }, []);

  const [messages, setMessages] = useState([]);
  const textareaEl = useRef(null);
  async function sendMessage() {
    try {
      const textareaValue = textareaEl.current.value;
      const request = await axios.put(
        'http://localhost:8080/message/new-message',
        {
          username: sessionStorage.getItem('username'),
          color: sessionStorage.getItem('color'),
          message: textareaValue,
        }
      );
      textareaEl.current.value = '';
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div className="chat-page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="chat">
        <div>
          {messages.map((msg) => {
            return (
              <Message
                key={msg.createdAt}
                color={msg.color}
                message={msg.message}
                username={msg.username}
                time={msg.createdAt}
              />
            );
          })}
        </div>
      </div>
      <div className="contact-list">
        <h2 style={{ borderBottom: '2px solid', padding: '20px' }}>
          contact list
        </h2>
        <div className="contacts">
          {users.map((user) => {
            return (
              <Contact
                key={user.createdAt}
                user={user.username}
                color={user.color}
              />
            );
          })}
        </div>
      </div>
      <div className="input-message">
        <textarea
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
              return;
            } else {
              return;
            }
          }}
          ref={textareaEl}
          className="textarea-message"
          name="message"
          cols="30"
          rows="2"
        ></textarea>
        <button style={{ height: '100%' }} onClick={() => sendMessage()}>
          {' '}
          <i className="fas fa-paper-plane"></i> send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
