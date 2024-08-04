import express from "express"; 
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv"; 
import cookierParser from "cookie-parser"; 
import cors from "cors"; 


dotenv.config(); 

const app = express(); 

// middlewares
app.use(express.json());
app.use(cookierParser()); 
app.use(cors({
    origin: "https://jwhat.netlify.app", 
    credentials: true, 
})); 


app.post("/", (req, res) => {

    const uname = req.body.username; 

    if(uname){
        const token = jwt.sign({user: process.env.USER}, process.env.SECRET); 
        res.cookie('token', token, {
            httpOnly: false, 
            secure: false, 
            sameSite: 'none', 
            maxAge: 60 * 60 * 60, 
            path: '/'
        }); 
            
        res.send(token); 
    }
    else{
        res.status(400).send("Username Required")
    }

})

app.listen(process.env.PORT, () => {
    console.log(`LISTENING ON PORT: ${process.env.PORT}`); 
})



