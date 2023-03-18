import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, Link} from 'react-router-dom'

const PlayerDash = (props) => {
    const navigate = useNavigate();
    // const {players, setPlayers} = props
    const [players, setPlayers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/players")
        .then(res=>setPlayers(res.data.players))
        .catch(err=>console.log(err))
    
    }, []);

    const navigateToCreate = ()=>{
        navigate("/api/players/create")
    }

    const deletePlayer = (id) => {
        axios.delete(`http://localhost:8000/api/players/${id}`)
        .then(res=>{
            const filteredPlayers = players.filter(player => player._id !== id)
            setPlayers(filteredPlayers)
        })
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <h1>Team Dashboard</h1>
            <table className="col-md-6 mx-auto mt-3">
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Preferred Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player)=>{
                        return (
                            <tr key={player._id}>
                                <td><Link to={`${player._id}`}>{player.name}</Link></td>
                                <td>{player.position}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={(e)=>deletePlayer(player._id)}>Delete</button>
                                </td>
                            </tr>
                        )})}
                </tbody>
            </table>
            <button className='btn btn-info mt-3 offset-6' onClick={navigateToCreate}>Create Player</button>
        </div>
    )
}

export default PlayerDash