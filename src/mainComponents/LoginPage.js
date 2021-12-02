const LoginPage = () => {
  return (
    <div className="login-page">
      <h1 className="title-login">Welcome To {'<chat.log />'}</h1>
      <div className="enter-form"></div>
      <input
        type="text"
        placeholder="please enter your username.."
        className="username-input"
      ></input>
      <input type="color" className="color-picker"></input>
      <button className="enter-button">Enter</button>
    </div>
  );
};

export default LoginPage;
