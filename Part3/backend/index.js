const express = require('express');
const Person = require('./mongo');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('dist'));
app.use(cors()); 
app.use(express.json()); 

morgan.token('body', (req) => {
    return Object.keys(req.body).length ? JSON.stringify(req.body) : '';
});

morgan.token('query', (req) => {
    return Object.keys(req.query).length ? JSON.stringify(req.query) : '';
});

const morganFormat = ':method :url :status :res[content-length] - :response-time ms - Query: :query - Body: :body';
app.use(morgan(morganFormat)); 

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error);
};

app.use(errorHandler);

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => res.json(persons))
        .catch(err => next(err));
});

app.get('/info', (req, res, next) => {
    const date = new Date().toLocaleString();
    
    Person.countDocuments()
        .then(count => {
            res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
        })
        .catch(err => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;

    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).send('Person not found');
            }
        })
        .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;

    Person.findByIdAndDelete(id)
        .then(deletedPerson => {
            if (!deletedPerson) {
                return res.status(404).json({ error: 'Person not found' });
            }
            res.json({ message: 'Person deleted', deletedPerson });
        })
        .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
    console.log('Received body:', req.body);

    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ error: 'content missing' });
    }

    Person.findOne({ name })
        .then(existingPerson => {
            if (existingPerson) {
                return res.status(400).json({ error: 'name must be unique' });
            }

            const person = new Person({ name, number });
            return person.save();
        })
        .then(savedPerson => {
            res.json(savedPerson);
            console.log('Person saved!', savedPerson);
        })
        .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;

    if (!updatedData.name || !updatedData.number) {
        return res.status(400).json({ error: 'content missing' });
    }

    Person.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                res.json(updatedPerson);
            } else {
                res.status(404).json({ error: 'Person not found' });
            }
        })
        .catch(err => next(err));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
