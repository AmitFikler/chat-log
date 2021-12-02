import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChatPage from './mainComponents/ChatPage';
import LoginPage from './mainComponents/LoginPage';

function App() {
  const [users, setUsers] = useState([
    'amit',
    'amit',
    'amit',
    'amit',
    'amit',
    'amit',
    'amit',
    'amit',
    'amit',
    'amit',
  ]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            exact
            path="/chat"
            element={<ChatPage users={users} setUsers={setUsers} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
