import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChatPage from './mainComponents/ChatPage';
import LoginPage from './mainComponents/LoginPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route exact path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
