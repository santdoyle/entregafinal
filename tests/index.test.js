const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const request = require('supertest')
const axios = require('axios')

const {config} = require('../config')
const app = require('../index')

chai.use(chaiHttp)
const url = `http://localhost:${config.PORT}`

describe('Test api', (done) => {
    describe('Test enpoint Login -', () => {
        it('Debe renderizar html, estado 200', (done) => {
            request(app)
                .get('/login')
                .expect('Content-Type', /html/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                });
    
                done()
        })
    })
    
    describe('Test endpoint /setLogin', () => {
        it('Login con contraseña incorrecta, debe retornar "La contraseña no es correcta"', (done) => {
            
            chai.request(app)
                .post('/setLogin')
                .set('content-type', 'application/json')
                .send({email: 'santdoyle@gmail.com', password: '888'})
                .then((resp) => {    
                    expect(resp).to.have.status(401)                
                    expect(resp.body.info.message.error).equal('La contraseña no es correcta')
                    done()
                })
                .catch(e => {
                    done(e)
                })
            
        })

        it('Login con correo no registrado. Debe retornar "El usuario no existe', done => {
            chai.request(app)
                .post('/setLogin')
                .set('content-type', 'application/json')
                .send({email: 'noexiste@gmail.com', password: '888'})
                .then((resp) => {                    
                    expect(resp.body.info.message.error).equal('El usuario no existe')
                    expect(resp).to.have.status(401)
                    done()
                })
                .catch(e => {
                    done(e)
                })
        })


        it('Login de usuario correcto. Debe retornar un objeto con mensaje de confirmación y token.', done => {
            chai.request(app)
                .post('/setLogin')
                .set('content-type', 'application/json')
                .send({email: 'santdoyle@gmail.com', password: '12345'})
                .then((resp) => {  
                    expect(resp).to.have.status(200)  
                    expect(resp.body.info.message.success).equal('Login correcto')
                    expect(resp.body.token).be.a('string')          
                    done()
                })
                .catch(e => {
                    done(e)
                })
        })
    })




    /*
    describe('Test endpoint /setLogin con axios', () => {
        describe('Test con contraseña incorrecta', () => {
            it('Debe retornar error, Contraseña incorrecta', (done) => {
                axios.post(`${url}/setLogin`, {
                    email: 'santdoyle@gmail.com',
                    password: '888'
                  })
                  .then(function (response) {
                    console.log('r', response.data);
                    expect(response.data.info.message.error).to.equal('La contraseña no es correcta')
                    done()
                  })
                  .catch(function (error) {
                    console.log('e', error);
                  });

            })
        })
    })*/
    
})