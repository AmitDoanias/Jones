const userService = require('./user.service')

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser,
}

async function getUsers(req, res) {
    try {
        const users = await userService.query()
        if (!users) return res.status(401).send('Failed to get users')
        res.send(users)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function getUserById(req, res) {
    try {
        const {userId} = req.params
        const user = await userService.getById(userId)
        if (!user) return res.status(401).send('Failed to get user')
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function addUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.add(user)
        if (!savedUser) return res.status(401).send('Failed to add user')
        res.send(savedUser)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add user' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        if (!savedUser) return res.status(401).send('Failed to update user')
        res.send(savedUser)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update user' })
    }
}

async function removeUser(req, res) {
    try {
        const { userId } = req.params
        const deletedCount = await userService.remove(userId)
        if (!deletedCount) return res.status(401).send('Failed to remove user')
        res.send('user removed successfully')
    } catch (err) {
        res.status(500).send({ err: 'Failed to remove user' })
    }
}
