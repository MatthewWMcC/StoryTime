let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let database = require('./database/db').db;



const userRoute = require('../server/routes/user_routes');
const { support } = require('jquery');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoUI || database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected sucessfully !')
},
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/home', userRoute)



const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../build'))
}

const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})