import express from 'express';
import colors from 'colors';
import cors from 'cors'
import morgan from 'morgan';
import  dotenv from 'dotenv'
import connectDB from './config/db.js';
dotenv.config()
import authRoute from './routes/auth.route.js'

const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Import routes
app.use('/api/v1/auth', authRoute)

app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome to Food Server App</h1>");
});


const PORT = process.env.PORT||8080
app.listen( PORT, () => {
    console.log(`Server is Running ${PORT}`.bgWhite.blue);  // Will log in green
    connectDB()
});