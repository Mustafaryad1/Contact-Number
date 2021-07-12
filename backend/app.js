// Contact system libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose  = require('mongoose');
const User = require('./models/users')

const ContactUser = require('./models/contacts')

// swagger config
const swaggerUi = require('swagger-ui-express');
// swaggerDocument = require('./swagger.json');


// routes
const contact_routes = require('./routes/contact_routes');


// config app
const app = express();
//  to parse request body as json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// corss origin 
app.use(cors());


// config mongodb
const mongodbURI = "mongodb+srv://mustafa:contactpassword@cluster0.tpo90.mongodb.net/contacts?retryWrites=true&w=majority"
mongoose.connect(mongodbURI, {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connection.on('error', err => {
    console.log(err)
});

// import routes
const contacts_routes = require('./routes/contact_routes');
const user_routes = require('./routes/user_routes');

// app root routes
app.get('/',(req,res)=>{
    res.send({'homepage':'this is home page'});
});

// load routes
app.use('/contacts',contacts_routes)
app.use('/user',user_routes)

// run express app
app.listen(3000, async ()=>{
    console.log("Server is Running on port 3000");
    const users = await User.find({});

    if (users.length == 0){
        
        // create first user 
        const user1 = new User({username:"user1",password:"user1"})
        user1.save().then(() =>{
            console.log("first user created")
        }).catch((err)=>{
            console.log(err)
        })

        // create second user
        const user2 = new User({username:"user2",password:"user2"})
        user2.save().then(() =>{
            console.log("second user created")
        }).catch((err)=>{
            console.log(err)
        })

    }else{
        console.log("[Users already exists <usersname:user1, password:user1>, <username:user2, password:user2>]")
    }

})

