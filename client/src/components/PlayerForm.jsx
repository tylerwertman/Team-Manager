import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const PlayerForm = () => {
    const navigate = useNavigate();
    // const {players, setPlayers} = props

    
    const [player, setPlayer] = useState({
        name: "",
        position: ""
    })

    const [errors, setErrors] = useState({})

    const onChangeHandler = (e) => {
        setPlayer({
            ...player,
            [e.target.name]: e.target.value
        })
    }

    const formValidator = () => {
        let isValid = true
        if(player.name.length<2) {
            return false
        }
        if(player.position.length<2) {
            return false
        }
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(formValidator()){
            axios.post('http://localhost:8000/api/players', player)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            navigate("/api/players")
        }
        else {
            setErrors({
                name: "Name must be at least 2 characters",
                position: "Position must be at least 2 characters"
            })
        }
    }

    return (
        <div>
            <h1>Add a Player</h1>
            <form action="" className='col-md-6 offset-3' onSubmit={handleSubmit}>
            {player.name.length<2 ? <p className="text-danger">{errors.name}</p> : ""}
                <div className="formgroup">
                    <label htmlFor="name">Player Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={onChangeHandler}/>
                </div>
                <div className="formgroup">
            {player.position.length<2 ? <p className="text-danger">{errors.position}</p> : ""}
                    <label htmlFor="name">Preferred Position</label>
                    <input type="text" className="form-control" name="position" id="position" onChange={onChangeHandler}/>
                </div>
                <button className='btn btn-info mt-3'>Create Player</button>
            </form>
        </div>
    )
}

export default PlayerForm