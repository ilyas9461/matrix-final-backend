const UserModel = require('../models/users')
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 *create user
 *@route POST /api/auth/signup
 *@access public
 *@example request data
    {
        name: "ilyas",
        email: "lhn2@gmail.com",
        password: "123456",
        confirmPassword: "123456"
    }
*@success data
    {
        name: "ilyas",
        email: "lhn2@gmail.com"
    }
 */
const addUser = async (req, res) => {
    const { ...user } = req.body
    console.log(user)
    user.password = await bcrypt.hash(user.password, 10)

    new UserModel(user).save()
        .then(data => {
            res.status(200).send({ name: data.name, email: data.email })
        })
        .catch(err => {
            res.status(500).send(err)
        })
}
/**
 *login user
 *@route POST /api/auth/singin
 *@access public
 *@example request data
    {
        "email": "lhn2@gmail.com",
        "password": "123456"
    }
*@success data
    {
        user: {
            "_id": "6810bb23babc4e3d642bbd12",
            "name": "ilyas",
            "email": "lhn2@gmail.com",
            "createdAt": "2025-04-29T11:42:27.633Z",
            "updatedAt": "2025-04-29T11:42:27.633Z",
            "__v": 0
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
    }
 */
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({ error: 'Email and password are required' });
    }

    UserModel.findOne({ email: email })
        .then(async user => {
            if (!user) {
                const err = { error: 'User not found or invalid credentials' }
                console.error('Error finding user:', err);
                return res.status(404).send(err);
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (isPasswordValid) {
                const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' })
                const { password, confirmPassword, ...userWithoutPsw } = user.toObject()

                res.cookie('token', token)

                return res.send({
                    user: userWithoutPsw,
                    token
                })
            }
            res.status(401).send({ message: 'Invalid username or password' });
        })
        .catch(err => {
            console.error('Error finding user:', err);
            res.status(400).send(err);
        });
}

const logout = (req, res) => {
    console.log('logoff user')
    res.clearCookie('token')
    res.status(200).send({ data: "Logout successful..." })
}

/**
 * All users
 *@route POST /api/users
 *@access public
 *@example request data
     {
        role: "ADMIN",
        email: "lhn2@gmail.com"
    }
*@success data
    [
        {
            "_id": "6810bb23babc4e3d642bbd12",
            "name": "ilyas",
            "email": "lhn2@gmail.com",
            ...
        },

]
 */
const getAllUsers = (req, res) => {
    const { email, role } = req.body

    if (email && role === "ADMIN") {
        UserModel.find({}).sort({ _id: 'desc' })
            .then(users => {
                if (users.length === 0)
                    res.send({ data: 'No users in DB!' })
                else
                    res.status(200).send(users)
            }).catch(err => {
                res.status(500).send(err)
            })
    }
    else {
        res.status(500).send({ data: 'Admin role is necessary.' })
    }
}

/**
 * Delete user
 *@route DELETE /api/del-user
 *@access public
 *@example request data
    {
        "user": {
            "_id": "6810bb23babc4e3d642bbd12",
            "name": "ilyas",
            "email": "lhn2@gmail.com",
            "createdAt": "2025-04-29T11:42:27.633Z",
            "updatedAt": "2025-04-29T11:42:27.633Z",
            "__v": 0
        }
    }
*@success data
    {
        "acknowledged": true,
        "deletedCount": 1
    }

 */
const deleteUser = (req, res) => {
    const { user } = req.body
    console.log(req.body);

    UserModel.deleteOne({ _id: { $eq: user._id } }).then(resData => {
        console.log(res);

        res.status(200).send(resData)
    })
        .catch(err => res.status(500).send(err))
}

/**
 * Update User
 *@route PUT /api/update-user
 *@access public
 *@example request data
    {
        "user": {
            "_id": "6810ccff4d0bc854ecd3ba51",
            "name": "ilyas 123",
            "email": "lhn2@gmail.com",
            "password": "123456",
            "confirmPassword": "123456"
        }
    }
*@success data
   {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }

 */
const updateUser = (req, res) => {
    const { user } = req.body; // Destructure _id and other fields from the request body

    if (!user._id) {
        return res.status(400).send({ error: 'Missing _id field in request body' });
    }
    const objectId = ObjectId.createFromHexString(user._id);
    UserModel.updateOne({ _id: objectId }, user).then(resData => {
        res.status(200).send(resData)

    }).catch(err => res.status(500).send(err))

}

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    updateUser,
    login,
    logout
}