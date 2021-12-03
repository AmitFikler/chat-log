import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const signInBtn = useRef(null);
  const inputUsername = useRef(null);
  const inputColor = useRef(null);

  async function newUser() {
    try {
      const username = inputUsername.current.value;
      const color = inputColor.current.value;
      const response = await axios.put('http://localhost:8080/users/new-user', {
        username,
        color,
      });
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('color', color);
      console.log(response);
      navigate('/chat');
    } catch (error) {
      console.log(error);
    }
  }
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
