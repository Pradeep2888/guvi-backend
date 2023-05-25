const express = require("express")
const { registerRouter } = require("./routes/register.route");
const cors = require("cors");
const { connection } = require("./config/db");
const { loginRouter } = require("./routes/login.route");
const { userProfile } = require("./routes/userprofile.route");


const app = express();
const PORT= 8080

app.use(cors()) 

app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome to api")
})

app.use("/register",registerRouter)
app.use("/login",loginRouter)
app.use("/profile",userProfile)







app.listen(PORT, async () => {
    try{
        await connection
        console.log("Connection to DB successfully")
    }
    catch(err){
        console.log(err)
        console.log("Error connecting to DB")
    }
    console.log(`Listening on PORT ${PORT}`)
})
