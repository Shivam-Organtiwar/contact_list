const mongoose = require('mongoose');


const ContactSchema = new mongoose.Schema({                                        //creating the schema
    name : {
        type : String,
        required : true
    },
    phone : {
        type: String,
        required : true
    }
});

const Contact = mongoose.model('Contact_DB', ContactSchema);
module.exports.AllContact = Contact;
