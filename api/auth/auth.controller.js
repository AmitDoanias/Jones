const authService = require('./auth.service')

const COOKIE_NAME = 'loginToken'

module.exports = {
    login,
    signup,
    logout
}

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)

        const loginToken = authService.getLoginToken(user)
        res.cookie(COOKIE_NAME, loginToken)
        res.json(user)
    } catch (err) {
        console.log('err', err)
        res.status(401).send({ err: 'Failed to login' })
    }
}

async function signup(req, res) {
    const { username, password, fullname } = req.body
    try {
        await authService.signup(username, password, fullname)
        const user = await authService.login(username, password)

        const loginToken = authService.getLoginToken(user)
        res.cookie(COOKIE_NAME, loginToken)
        res.json(user)
    } catch (err) {
        if (err = 'Username already taken') return res.status(406).send(err)
        res.status(401).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie(COOKIE_NAME)
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}