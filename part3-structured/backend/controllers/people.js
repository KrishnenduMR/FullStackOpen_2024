const peopleRouter = require('express').Router()
const Person = require('../models/person')

peopleRouter.get('/', (req, res, next) => {
    Person.find({})
      .then(persons => res.json(persons))
      .catch(err => next(err))
  })
  
peopleRouter.get('/info', (req, res, next) => {
    const date = new Date().toLocaleString()
  
    Person.countDocuments()
      .then(count => {
        res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
      })
      .catch(err => next(err))
  })
  
peopleRouter.get('/:id', (req, res, next) => {
    const id = req.params.id
  
    Person.findById(id)
      .then(person => {
        if (person) {
          res.json(person)
        } else {
          res.status(404).send('Person not found')
        }
      })
      .catch(err => next(err))
  })
  
peopleRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id
  
    Person.findByIdAndDelete(id)
      .then(deletedPerson => {
        if (!deletedPerson) {
          return res.status(404).json({ error: 'Person not found' })
        }
        res.json({ message: 'Person deleted', deletedPerson })
      })
      .catch(err => next(err))
  })
  
peopleRouter.post('/', (req, res, next) => {
    console.log('Received body:', req.body)
  
    const { name, number } = req.body
    if (!name || !number) {
      return res.status(400).json({ error: 'content missing' })
    }
  
    Person.findOne({ name })
      .then(existingPerson => {
        if (existingPerson) {
          return res.status(400).json({ error: 'name must be unique' })
        }
  
        const person = new Person({ name, number })
        return person.save()
      })
      .then(savedPerson => {
        res.json(savedPerson)
        console.log('Person saved!', savedPerson)
      })
      .catch(err => next(err))
  })
  
peopleRouter.put('/:id', (req, res, next) => {
    const id = req.params.id
    const updatedData = req.body
  
    if (!updatedData.name || !updatedData.number) {
      return res.status(400).json({ error: 'content missing' })
    }
  
    Person.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
      .then(updatedPerson => {
        if (updatedPerson) {
          res.json(updatedPerson)
        } else {
          res.status(404).json({ error: 'Person not found' })
        }
      })
      .catch(err => next(err))
  })
module.exports = peopleRouter