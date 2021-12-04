import moment from 'moment';

const Message = ({ color, message, username, time }) => {
  return (
    <div className="message" style={{ color }}>
      <div>{moment(time).toDate()}</div>
      <div className="flexdiv">
        <div>{username}:</div>
        {message}
      </div>
    </div>
  );
};

export default Message;
