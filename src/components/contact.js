const Contact = ({ user, color }) => {
  function handleWithBlack(color) {
    if (color === '#000000') {
      return '#FFFFFF';
    }
    return color;
  }

  function getFirstLetter(user) {
    const splitUser = user.split('');
    return splitUser[0].toUpperCase();
  }
  if (user)
    return (
      <div className="contact">
        <span
          style={{ backgroundColor: handleWithBlack(color) }}
          className="iconUser"
        >
          {getFirstLetter(user)}
        </span>
        {user}
      </div>
    );
};

export default Contact;
