import React from 'react';
import Uno from './components/Uno/Uno';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {io} from "socket.io-client"

const socket = io('http://localhost:3001', { transports: ["websocket"] });
socket.connect()

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Uno socket={socket} startGame={() => {}} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
