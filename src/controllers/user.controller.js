import bcrypt from "bcrypt"

class UserController {
    static register(req, res) {
        try {
            const { username, password } = req.body
            const payload = { username, password }
            const salt = bcrypt.genSaltSync(10);
            payload.password = bcrypt.hashSync(payload.password, salt);
            return res
                .status(200)
                .json({
                    msg: 'Registered successfully',
                    data: payload
                })
        } catch (error) {
            console.log('Error----', error)
            return res.status(500).json({ msg: error.message })
        }
    }

    static login(req, res) {
        return res.status(200).json({ msg: 'Mai login method se aaya' })
    }
}

export default UserController