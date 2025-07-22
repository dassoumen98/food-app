import express from 'express'

let app = express()


app.get("/" , (req,res)=>{
    res.status(200).send("<h1>Welcome to Food Server App</h1>")
})


app.listen(8080 , ()=>{
    console.log("Server is Running");
    
})