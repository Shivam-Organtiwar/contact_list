const express = require('express');                              //importing Express Server
const path = require('path');                                    // importing path module
const port = 8000;                                               //specifying port number
const db = require('./config/mongoose.js');                      //importing the ODM Mongoose
const Contact = require('./models/contact');                     //importing the Schema 
const app = express();                                           //launching the sever for use

app.set('view engine', 'ejs');                                   //setting up the template engine EJS
app.set('views', path.join(__dirname, 'views'));                 //joining the ejs file with server
app.use(express.urlencoded());                                   //importing the middleware provided by Express
app.use('*/assets', express.static(__dirname + '/assets'));      //joining the assets folder with the server


// app.use(function(req, res, next) {                            //creating an Middleware
//     console.log('Middleare 1 called');
//     next();
// });



var favouriteList = [];

app.get('/', function(req, res) {                                 //function to handel request and response on home page
    Contact.AllContact.find({}, function(err, contactList) {   
        if(err){                                                  //handling the error if any         
            console.log("Error");
            return;
        }

        return res.render('home', {                               //Rendering the contact list
            title : "Contact List",
            contact_list : contactList
        });
    });

});



app.post('/create-contact', function(req, res)  {                 //It appends the data to the contact list provided by user 
    console.log(req.body);

    Contact.AllContact.create({                                   //populating the data into MongoDB 
        name : req.body.name,
        phone : req.body.phone

    }, function(err, newContact) {
        if(err){
            console.log("Error creating a contact");
            return;
        }

        console.log("***###", newContact);
        return res.redirect('back');
    });
});




app.get('/delete-contact/', function(req, res){                    //Deleting the contact through Query Params
    
    console.log(req.query);
    let idDelete = req.query.id;                                   //Creating the id of contact to be deleted

    Contact.AllContact.findByIdAndDelete(idDelete, function(err) { //using the inbuilt function to delete
        
        if(err){
        console.log("Error, cannot delete");
        return;
    }
});
    return res.redirect('back');
});


app.listen(port, function(err){                                   //checking for error while running Express Server 
    if(err){
        console.log("Error In Running The Server");
        return;
    }
    console.log("Cool! Express Server Is Running On Port Number:", port);
});