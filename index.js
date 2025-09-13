const  express  = require("express");
const  cors  = require("cors");
const {connectDB} = require("./database.js");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use('/', require('./routes/index.js'))

app.listen(80, ()=>{
    console.log(`server is runing on port 80`);
});