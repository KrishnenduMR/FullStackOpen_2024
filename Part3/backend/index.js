const express = require('express');
var morgan = require('morgan');
const cors = require('cors');  // Import CORS
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique ID generation

const app = express();
const port = process.env.PORT || 3001;
app.use(express.static('dist'))
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

morgan.token('body', (req) => {
   return Object.keys(req.body).length ? JSON.stringify(req.body) : '';
});

morgan.token('query', (req) => {
    return Object.keys(req.query).length ? JSON.stringify(req.query) : '';
});

const morganFormat = ':method :url :status :res[content-length] - :response-time ms - Query: :query - Body: :body';
app.use(morgan(morganFormat)); // Log incoming data

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(person => person.id === req.params.id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).send('Person not found');
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const personIndex = persons.findIndex(person => person.id === req.params.id);
    if (personIndex === -1) {
        res.status(404).send('Person not found');
    } else {
        persons = persons.filter(person => person.id !== req.params.id);
        res.status(204).end(); // No content to send back
    }
});

app.post('/api/persons', (req, res) => {
    console.log('Received body:', req.body); // Log incoming data for debugging

    const person = req.body;
    if (!person.name || !person.number) {
        return res.status(400).json({ error: 'content missing' });
    }
    if (persons.find(p => p.name === person.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }
    const id = uuidv4(); // Generate a unique ID
    const newPerson = {
        id: id,
        name: person.name,
        number: person.number
    };
    persons = persons.concat(newPerson);
    res.json(newPerson);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
