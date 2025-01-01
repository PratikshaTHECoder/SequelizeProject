const express = require('express')
const bodyParser = require('body-parser')
require('./models/index')
var userCtrl = require('./controllers/userController')
const app = express()

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
// app.get('/add', function (req, res) {
//     res.send('Hello World1111')
//   })
// User.sync({force : true})
// Contact.sync({force : true})

app.get('/add',userCtrl.addUser)
app.get('/users',userCtrl.getUsers)
app.get('/users/:id',userCtrl.getUser)
app.post('/users',userCtrl.postUser)
app.delete('/users/:id',userCtrl.deleteUser)
app.patch('/users/:id',userCtrl.patchUser)
app.get('/getSetVertualUser',userCtrl.getSetVertualUser)
app.get('/validator',userCtrl.validator)
app.get('/raw-queries',userCtrl.rawQueriesUser)
app.get('/one-to-one',userCtrl.oneToOneUser)
app.get('/one-to-many',userCtrl.oneToManyUser)
app.get('/many-to-many',userCtrl.manyToManyUser)
app.get('/paranoid',userCtrl.paranoid)
app.get('/eagerLoading',userCtrl.eagerLoading)
app.get('/hooks',userCtrl.hooksUser)
app.get('/sub-queries',userCtrl.subQueries)








app.listen(3001,()=>{
    console.log("app will running on : http://localhost:3001")
})