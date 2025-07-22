import express from 'express';
import colors from 'colors';
import cors from 'cors'
import morgan from 'morgan';
import  dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome to Food Server App</h1>");
});

const PORT = process.env.PORT||8080
app.listen( PORT, () => {
    console.log(`Server is Running ${PORT}`.bgWhite.blue);  // Will log in green
});
