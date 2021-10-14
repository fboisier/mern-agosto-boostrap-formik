import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteButton from './DeleteButton';


const PersonList = props => {
    const {people, setPeople} = props;

    useEffect(() => {
        axios.get('http://localhost:8000/api/people')
            .then(res => setPeople(res.data));
    }, [setPeople])

    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id !== personId))
    }

    return (
        <div>
            {people.map((person, idx)=>{
                return <div key={idx}>
                            <p > 
                            <Link to={"/people/"+ person._id}>{person.lastName}, {person.firstName}</Link>  <Link to={"/people/"+ person._id + "/edit"}>Editar</Link>
                            </p>
                            <DeleteButton personId={person._id} successCallback={()=>removeFromDom(person._id)}/>
                        </div>
            })}
        </div>
    )
}
export default PersonList;