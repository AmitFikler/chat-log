import axios from 'axios';
import { useRef } from 'react';

const LoginPage = () => {
  const signInBtn = useRef(null);
  const inputUsername = useRef(null);
  const inputColor = useRef(null);
  const newUser = async () => {
    const username = inputUsername.current.value;
    const color = inputColor.current.value;
    await axios.put('http://localhost:8080/users/new-user', {
      color: color,
      username: username,
    });
  };
  return (
    <div className="login-page">
      <h1 className="title-login">Welcome To {'<chat.log />'}</h1>
      <div className="enter-form"></div>
      <input
        ref={inputUsername}
        type="text"
        placeholder="please enter your username.."
        className="username-input"
      ></input>
      <input ref={inputColor} type="color" className="color-picker"></input>
      <button ref={signInBtn} onClick={newUser} className="enter-button">
        Enter
      </button>
    </div>
  );
};

export default LoginPage;
