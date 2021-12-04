import moment from 'moment';

const Message = ({ color, message, username, time }) => {
  const convertTime = (date) => {
    return moment(date).format('LT');
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
      <div>{convertTime(time)}</div>
      <div className="flexMessage">
        <div style={{ fontWeight: 'bold' }}>{checkWhoSend(username)}</div>
        {message}
      </div>
    </div>
  );
};

export default Message;
