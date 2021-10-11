import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

const PersonList = props => {
    const { removeFromDom } = props;

    const deletePerson = (personId) => {
        axios.delete('http://localhost:8000/api/people/' + personId)
            .then(res => {
                removeFromDom(personId)
            })
    }

    return (
        <div>
            {props.people.map((person, idx)=>{
                return <>
                            <p key={idx}> 
                            <Link to={"/people/"+ person._id}>{person.lastName}, {person.firstName}</Link>  <Link to={"/people/"+ person._id + "/edit"}>Editar</Link>
                            </p>
                            <button onClick={(e)=>{deletePerson(person._id)}}>
                                Delete
                            </button>
                        </>
            })}
        </div>
    )
}
export default PersonList;