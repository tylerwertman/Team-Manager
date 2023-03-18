import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

const PlayerDetail = (props) => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [onePlayer, setOnePlayer] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/players/${id}`)
        .then(res=>setOnePlayer(res.data.player))
        .catch(err=>console.log(err))
    
    }, []);

    const deletePlayer = () => {
        axios.delete(`http://localhost:8000/api/players/${id}`)
        .then(res=>navigate("/api/players"))
        .catch(err=>console.log(err))
    }

    const navigateToEdit = (e) => {
        navigate(`/api/players/${id}/edit`)
    }
    return (
        <div>
            <h2>Name: {onePlayer.name}</h2>
            <h3>Preferred Position: {onePlayer.position}</h3>
            <p>Game 1 Status: {onePlayer.gameOneStatus}</p>
            <p>Game 2 Status: {onePlayer.gameTwoStatus}</p>
            <p>Game 3 Status: {onePlayer.gameThreeStatus}</p>
            <button className='btn btn-info' onClick={navigateToEdit}>Edit Player</button>
            <button className='btn btn-danger' onClick={deletePlayer}>Delete Player</button>
        </div>
    )
}

export default PlayerDetail