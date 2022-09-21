/* FIX - At the beginning: */
// 1. Update project name at package.json and package-lock.json.
// 2. Remove installations if not in use from package.json.
// 3. Update database name in db.service.js
// 4. Remove this comment.
// 5. Init git

const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

//ROUTES
const orderRoutes = require('./api/order/order.routes')
app.use('/api/order', orderRoutes)


/* LAST FALLBACK */
app.get('/**', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})