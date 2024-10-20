import express from "express"
import { users } from "./constants.js"
import { mockUsers } from "./constants.js"
import axios, { AxiosError } from "axios"

const app = express()

const PORT = 8080
let userCount = 0

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

const errorHandler = (error, req, res, next) => {
    if (error) {
        console.log('Error from error handler middleware---', error)
        let msg = error instanceof AxiosError ? 'mai axios error ka instance hu' : error.message
        return res.status(500).json({
            msg
        });
    }
}
// app.use(logMiddleware, logMiddleware2)

app.use(express.json())
app.use(express.static('public'))
app.use(express.static('files'))

// route for getting all users
app.get('/', (req, res, next) => {
    try {
        throw new Error ('Mai / end point se aane wala error hu')
        let a = 1;
        let b = 3;
        const result = a + b
        return res.json({ data: users })
    } catch (error) {
        next(error)
    }
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

// put request
app.put('/api/put/:id', (req, res) => {
    const { id } = req.params

    console.log('Request body---', req.body)

    const parsedId = parseInt(id);

    if (isNaN(parsedId)) return res.json({ msg: 'Bhai kya kar raha hai tu' });

    const index = mockUsers.findIndex(user => user.id === parsedId)

    console.log('Index----', index)

    if (index === -1) return res.status(404).json({ msg: 'User nor found' })

    mockUsers[index] = { id: parsedId, ...req.body }

    return res.status(200).json({
        msg: 'User details updated successfully',
        user: mockUsers
    })
})

//patch request
app.patch('/api/patch/:id', (req, res) => {
    const { id } = req.params;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.json({ msg: 'Please enetr a valid id' });

    const index = mockUsers.findIndex(user => user.id === parsedId);

    if (index === -1) return res.status(404).json({ msg: 'User not found' });

    mockUsers[index] = { ...mockUsers[index], ...req.body }

    return res.status(200).json({
        msg: 'User updated successfully',
        users: mockUsers
    })
})

// delete request
app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;
    const parseId = parseInt(id);
    const index = mockUsers.findIndex(user => user.id === parseId)

    mockUsers.splice(index, 1)

    return res.status(200).json({
        msg: 'User deleted successfully',
        users: mockUsers
    })
})

app.get('/get/post', async (req, res, next) => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/1')

        throw new Error('yeh Error class ka instance hai')
        console.log('Data obj is----', data)
        return res.status(200).json({
            data
        })
    }
    catch (error) {
        next(error)
        // console.log(error)

        // let msg = error instanceof AxiosError ? 'yeh ek axios error ka instance hai' : error.message

        // return res.status(500).json({
        //     msg
        // })
    }
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})