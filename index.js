import express from "express"
import { users } from "./constants.js"

const app = express()

const PORT = 8080

// route for getting all users
app.get('/', (req, res) => {
    let a = 1;
    let b = 3;
    const result = a + b
    return res.json({ data: users })
})

//create - post
// read - get
// update - patch/put
// delete - delete


// route for getting user by id
app.get('/:id', (req, res) => {
    const { id } = req.params
    console.log('Id----', id)
    console.log('Type of id--', typeof id)
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.json({ msg: 'Please enter a valid user id' })
    const findUser = users.find(user => user.id === parsedId)
    if (!findUser) return res.json({ msg: 'User not found' })
    return res.json({ findUser })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})