const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path=require('path');
const logger = require('morgan');
require("dotenv").config();

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const systemRoute = require('./routes/systemRoute');
const fdRoutes = require('./routes/fdRoute');

const app = express();
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://localhost:3000',
    'https://3.109.184.63',
    'https://35.154.246.182'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(
  cors({
    origin: ["https://localhost:3000", "https://3.109.184.63", "https://35.154.246.182"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((responce) => {
    console.log("Connected to MongoDB , ", responce.connection.name);
  })
  .catch((err) => console.log(err));




app.use(logger("dev")); // for logs 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './view');

app.get('/', (req, res) => {

    res.status(200).json({
        message: "server is up and running 🛠"
    })

});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/profile",profileRoute);
app.use("/api/system",systemRoute);
app.use("/api/fd",fdRoutes);



app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Not found, Check the URL properly !!!' });
})

app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON payload' });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error occurred while starting the server..." + err);
        return
    }
    console.log(`server started on PORT --> ${PORT}`);
})