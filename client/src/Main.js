import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PersonForm } from './components/PersonForm';
import PersonList from './components/PersonList';


const Main = () => {
    const [message, setMessage] = useState("Loading...")

    const [people, setPeople] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]); 


    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then(res => setMessage(res.data.message))

        axios.get('http://localhost:8000/api/people')
            .then(res => {
                setPeople(res.data);
                setLoaded(true);
            });
    }, []);


    const createPerson = person => {
        axios.post('http://localhost:8000/api/people', person)
            .then(res=>{
                setPeople([...people, res.data]);
            }).catch(err=>{
                const errorResponse = err.response.data.errors; 
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <h2>Message from the backend: {message}</h2>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <PersonForm onSubmitProp={createPerson} initialFirstName="" initialLastName="" />
            <hr />
            {loaded && <PersonList people={people} setPeople={setPeople} />}
        </div>
    )
}

export default Main;