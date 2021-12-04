const Contact = ({ user, color }) => {
  const splitUser = user.split('');
  function handleWithBlack(color) {
    if (color === '#000000') {
      return '#FFFFFF';
    }
    return color;
  }
  if (user)
    return (
      <div className="contact">
        <span
          style={{ backgroundColor: handleWithBlack(color) }}
          className="iconUser"
        >
          {splitUser[0].toUpperCase()}
        </span>
        {user}
      </div>
    );
};

export default Contact;
