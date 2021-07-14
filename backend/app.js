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

// socket io 
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors:true,
    origins:['*']
})
// handle connections
io.on("connection",(socket)=>{
    console.log(`socket.io: User connected ${socket.id}`);
    socket.on("edit",(contact_id)=>{
        console.log("called");
        socket.broadcast.emit("blockEdit",contact_id);
        
    });
    socket.on("disconnect",()=>{
        console.log(`socket.io: User disconnected ${socket.id}`);
    })
})

// config mongodb
const mongodbURI = "mongodb+srv://mustafa:contactpassword@cluster0.tpo90.mongodb.net/contacts?retryWrites=true&w=majority"
mongoose.connect(mongodbURI, {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connection.on('error', err => {
    console.log(err)
});
// mongoose connection and listener
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb database connected ");

    // settings change streams
    const contactChangeStream = connection.collection('contact_users').watch();

    contactChangeStream.on("change",(change)=>{
        switch(change.operationType){
            case "insert":
                const contact = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                };
            io.of("/api/socket").emit("newContact",contact);
            break
        }
    })

})


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
server.listen(3000, async ()=>{
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

