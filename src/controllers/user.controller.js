import bcrypt from "bcrypt"
import { registerSchema } from "../schemas/user.schema.js";
import { formatErrors, sanitize } from "../utils/common-functions.js";
import { ZodError } from "zod";


class UserController {
    static register(req, res) {
        try {
            const { username, password } = req.body
            // const payload = { username, password }
            const formattedPayload = {
                username: sanitize(username),
                password: sanitize(password)
            }
            const parsedPayload = registerSchema.parse(formattedPayload)
            console.log('Parse payload----', parsedPayload)
            const salt = bcrypt.genSaltSync(10);
            formattedPayload.password = bcrypt.hashSync(formattedPayload.password, salt);
            return res
                .status(200)
                .json({
                    msg: 'Registered successfully',
                    data: formattedPayload
                })
        } catch (err) {
            console.log('Error----', err)
            let errors = err instanceof ZodError ? formatErrors(err) : err
            return res.status(500).json({ msg: errors })
        }
    }
    static login(req, res) {
        return res.status(200).json({ msg: 'Mai login method se aaya' })
    }
}

export default UserController