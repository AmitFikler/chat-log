import moment from 'moment';

const Message = ({ color, message, username, time }) => {
  const convertTime = (date) => {
    console.log(moment(date, moment.ISO_8601));
  };
  function checkWhoSend(user) {
    if (user === sessionStorage.getItem('username')) {
      return 'You:';
    } else {
      return username;
    }
  }

  return (
    <div className="message" style={{ color }}>
      <div>{time}</div>
      <div className="flexMessage">
        <div style={{ fontWeight: 'bold' }}>{checkWhoSend(username)}</div>
        {message}
      </div>
    </div>
  );
};

export default Message;
