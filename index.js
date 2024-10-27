import express from "express"
import "dotenv/config"
import router from "./src/routes/index.js";

const app = express();
app.use(express.json())

const PORT = process.env.PORT

// console.log(`Environment is ${process.env.NODE_ENV}`)
// console.log(`User is ${process.env.TEST_USER}`)

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})