import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { PersonForm } from '../components/PersonForm';
import DeleteButton from '../components/DeleteButton';

const Update = props => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const { firstName, lastName } = person;
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8000/api/people/' + id)
            .then(res => {
                setPerson(res.data);
                setLoaded(true);
            })
    }, [id])
    const updatePerson = person => {
        axios.put('http://localhost:8000/api/people/' + id, person)
            .then(res => {
                console.log(res)
                history.push("/people");
            }).catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            });
    }
    return (
        <>
            <h1>Update a Person</h1>
            {loaded && (
                <>
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                    <PersonForm
                        onSubmitProp={updatePerson}
                        initialFirstName={firstName}
                        initialLastName={lastName}
                    />
                    <DeleteButton personId={person._id} successCallback={() => history.push("/people")} />
                </>
            )}
        </>
    )
}

export default Update;