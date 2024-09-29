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
        validator: function(v) {
            return /^(http|https):\/\/[^ "]+$/.test(v);
        },
    },
  likes : {
    type: Number,
    default: 0,
    validator: function(v) {
        return v >= 0 && /[0-9]+/.test(v.toString());
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