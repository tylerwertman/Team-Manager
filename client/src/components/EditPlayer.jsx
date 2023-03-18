import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

const EditPlayer = (props) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [onePlayer, setOnePlayer] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/players/${id}`)
            .then(res=>setOnePlayer(res.data.player))
            .catch(err=>console.log(err))
    }, []);

    const editPlayer = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/players/${id}`, onePlayer)
            .then(res=>navigate("/api/players"))
            .catch(err=>console.log(err))
    }

    const changeHandler = (e) =>{
        setOnePlayer({
            ...onePlayer,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <h1>Edit a Player</h1>
            <form action="" className='col-md-6 offset-3' onSubmit={editPlayer} >
                {/* {player.name.length < 2 ? <p className="text-danger">{errors.name}</p> : ""} */}
                <div className="formgroup">
                    <label htmlFor="name">Player Name</label>
                    <input type="text" className="form-control" name="name" id="name" value={onePlayer.name} onChange={changeHandler}/>
                </div>
                <div className="formgroup">
                    {/* {player.position.length < 2 ? <p className="text-danger">{errors.position}</p> : ""} */}
                    <label htmlFor="name">Preferred Position</label>
                    <input type="text" className="form-control" name="position" id="position" value={onePlayer.position} onChange={changeHandler}/>
                </div>
                <button className='btn btn-info mt-3'>Edit Player</button>
            </form>
        </div>
    )
}

export default EditPlayer