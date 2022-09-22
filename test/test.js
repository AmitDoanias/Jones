let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')

chai.use(chaiHttp)
//Test the GET
describe('GET ', () => {
    it('It should GET all the orders from 24 hours', (done) => {
        chai.request(server)
            .get('/api/order')
            .end((err, response) => {
                response.should.have.status(200)
                response.body.should.be.a('array')
                done()
            })
    })
})

//Test the POST
describe('POST', () => {
    it('It should POST a new order', (done) => {
        const order = {
            meal: "Hamburger",
            price: "100",
            user: {
                "firstName": "Ran",
                "lastName": "Azar",
                "address": "Haklarinet 21",
                "creditCard": "5320102310942138"
            }
        }
        chai.request(server)
            .post('/api/order')
            .send(order)
            .end((err, response) => {
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property('meal')
                response.body.should.have.property('price')
                done()
            })
    })
})