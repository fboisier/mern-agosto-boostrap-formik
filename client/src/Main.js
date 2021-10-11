import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PersonForm } from './components/PersonForm';
import PersonList from './components/PersonList';


const Main = () => {
    const [message, setMessage] = useState("Loading...")

    const [people, setPeople] = useState([]);
    const [loaded, setLoaded] = useState(false);



    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then(res => setMessage(res.data.message))

        axios.get('http://localhost:8000/api/people')
            .then(res => {
                setPeople(res.data);
                setLoaded(true);
            });
    }, []);

    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id !== personId));
    }


    return (
        <div>
            <h2>Message from the backend: {message}</h2>
            <PersonForm />
            <hr />
            {loaded && <PersonList people={people}  removeFromDom={removeFromDom} />}
        </div>
    )
}

export default Main;