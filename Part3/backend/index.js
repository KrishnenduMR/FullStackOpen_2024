const express = require('express');
const Person = require('./mongo')
require('dotenv').config();
var morgan = require('morgan');
const cors = require('cors');  // Import CORS

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


// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.message); // Log the error message
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message }); // Handle validation errors
    }
    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid ID format' }); // Handle invalid ID format errors
    }
    res.status(500).json({ error: 'Internal Server Error' }); // Handle other errors
};

app.use(errorHandler); // Register the error handling middleware

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => res.json(persons))
        .catch(err => next(err)); // Pass error to next middleware
});

app.get('/info', (req, res) => {
    const date = new Date().toLocaleString(); // Get the current date and time
        
    // Use Mongoose to count the number of documents
    Person.countDocuments()
        .then(count => {
                res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
            })
            .catch(err => next(err)); // Pass error to next middleware
        });
        


app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id; // Get the ID from the request parameters

    // Use Mongoose to find the person by ID
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person); // Return the found person
            } else {
                res.status(404).send('Person not found'); // Handle case where person doesn't exist
            }
        })
        .catch(err => next(err)); // Pass error to next middleware
});


app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id; // Get the ID from the request parameters

    Person.findByIdAndDelete(id)
        .then(deletedPerson => {
            if (!deletedPerson) {
                return res.status(404).json({ error: 'Person not found' });
            }
            res.json({ message: 'Person deleted', deletedPerson });
        })
        .catch(err => next(err)); // Pass error to next middleware
});


app.post('/api/persons', (req, res) => {
    console.log('Received body:', req.body); // Log incoming data for debugging

    const person = req.body;
    if (!person.name || !person.number) {
        return res.status(400).json({ error: 'content missing' });
    }
    Person.findOne({ name: person.name })
        .then(existingPerson => {
            if (existingPerson) {
                return res.status(400).json({ error: 'name must be unique' });
            }

            // Create a new person
            const p = new Person({
                name: person.name,
                number: person.number,
            });

            // Save the new person
            return p.save();
        })
        .then(savedPerson => {
            res.json(savedPerson); // Send the saved person in the response
            console.log('Person saved!', savedPerson);
        })
        .catch(err => next(err)); // Pass error to next middleware
});

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id; // Get the ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body

    // Validate required fields (you can customize this validation)
    if (!updatedData.name || !updatedData.number) {
        return res.status(400).json({ error: 'content missing' });
    }

    // Use Mongoose to find and update the person by ID
    Person.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true }) // Options: new: return the modified document
        .then(updatedPerson => {
            if (updatedPerson) {
                res.json(updatedPerson); // Return the updated person
            } else {
                res.status(404).json({ error: 'Person not found' }); // Handle case where person doesn't exist
            }
        })
        .catch(err => next(err)); // Pass error to next middleware
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
