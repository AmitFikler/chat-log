const source = new EventSource('http://localhost:8080/users');
const ChatPage = ({ users, setUsers }) => {
  source.onmessage = function logEvent(event) {
    const data = JSON.parse(event.data);
    setUsers(data);
  };
  return (
    <div className="chat-page">
      <div className="chat">chat</div>
      <div className="contact-list">
        <h2 style={{ borderBottom: '2px solid', padding: '20px' }}>
          contact list
        </h2>
        <ul>
          {users.map((user) => {
            return <li>{user}</li>;
          })}
        </ul>
      </div>
      <div className="input-message">
        <textarea
          className="textarea-message"
          name="message"
          cols="30"
          rows="2"
        ></textarea>
        <button>
          {' '}
          <i className="fas fa-paper-plane"></i> send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
