import React, {useState} from 'react'
import './App.css';
import PlayerForm from './components/PlayerForm';
import {Route, Routes} from 'react-router-dom'
import PlayerDash from './components/PlayerDash';
import PlayerDetail from './components/PlayerDetail';
import EditPlayer from './components/EditPlayer';
import Navbar from './components/Navbar';

function App() {
  const [players, setPlayers] = useState([])
  
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route element= {<PlayerDash players={players} setPlayers={setPlayers}/>} path="api/players/" />
        <Route element= {<PlayerForm players={players} setPlayers={setPlayers}/>} path="api/players/create" />
        <Route element= {<PlayerDetail/>} path="api/players/:id" />
        <Route element= {<EditPlayer/>} path="api/players/:id/edit" />
      </Routes>
    </div>
  );
}

export default App;
