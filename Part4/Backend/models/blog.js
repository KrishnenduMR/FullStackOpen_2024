const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
          return /^(http|https):\/\/[^\s/$.?#].[^\s]*$/.test(v); // URL validation regex
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  likes : {
    type: Number,
    default: 0,
    validator: function(v) {
      return /^[0-9]+$/.test(v)
    },
  }

})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



module.exports = mongoose.model('Blog', blogSchema)