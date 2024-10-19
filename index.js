import express from "express"
import { users } from "./constants.js"

const app = express()


const PORT = 8080
let userCount = 0
const mockUser = []

const logMiddleware = (req, res, next) => {
    userCount++
    console.log('Mai logMiddlware mai aaya')
    console.log('User count is---', userCount)
    // return res.json({ msg: 'Bhaisahab mai pehle middleware se hi return ho gaya' })
    next()
}

const logMiddleware2 = (req, res, next) => {
    console.log('Mai dusre logMiddlware mai aaya')
    const obj = {
        name: 'hanif',
        salary: 25
    }

    req.hanif = obj
    // return res.json({ msg: 'Bhaisahab mai dusre middleware se hi return ho gaya' })
    next()
}
// app.use(logMiddleware, logMiddleware2)
app.use(express.json())

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

// route for getting data by query params
app.get('/api/filter', (req, res) => {
    try {
        const { username, email } = req.query

        console.log('Username---', username)
        console.log('Email---', email)

        console.log('Request obj---', req.hanif)

        //  throw new Error('Kuch error aa gaya bhai')

        //  const findUser = users.find(user => user.username === username && user.email === email)

        const findUser = users.filter(user => user.username.includes(username) || user.email.includes(email))

        if (!findUser) return res.status(414).json({ msg: 'The user is not found' })

        return res.status(200).json({
            msg: 'The user was found',
            findUser
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

app.post('/add/user', (req, res) => {
    const { username, password } = req.body

    console.log('Username----', username)
    console.log('Password---', password)

    mockUser.push({ username, password })

    return res.status(201).json({
        msg: 'User created successfully',
        user: mockUser
    });
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})