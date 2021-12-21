const { Person } = require("../models/person.model");


const index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

const createPerson = (request, response) => {
    console.log(request.body);
    const { firstName, lastName } = request.body;
    Person.create({
        firstName,
        lastName
    }).then(person => response.json(person))
        .catch(err => response.status(400).json(err));
}

const getAllPeople = (request, response) => {
    Person.find({})
        .then(persons => response.json(persons))
        .catch(err => response.status(400).json(err))
}

const getPerson = (request, response) => {
    Person.findOne({_id:request.params.id})
        .then(person => response.json(person))
        .catch(err => response.status(400).json(err))
}

const updatePerson = (request, response) => {
    Person.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.status(400).json(err))
}

const deletePerson = (request, response) => {
    Person.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(400).json(err))
}

module.exports = {
    index,
    createPerson,
    getAllPeople,
    getPerson,
    updatePerson,
    deletePerson
}
