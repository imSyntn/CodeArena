const express = require('express')
const app = express();
const cors = require('cors')

const {createServer} = require('http')
const {Server} = require('socket.io')

const mongoose = require('mongoose')
const { Topics } = require('./Topics.json')
const { Questions } = require('./QuestionData.json')

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: true
    }
})

mongoose.connect('mongodb://127.0.0.1:32768/CodeArena').then(()=> console.log('MongoDB Connected'))

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const Model = mongoose.model('CodeArena', schema)

app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.send('ok')
})
app.get('/topics',(req,res)=>{
    res.send(Topics)
})
app.get('/Questions',(req,res)=>{
    res.send(Questions)
})
app.get('/Questions/:id',(req,res)=>{
    const id = req.params.id
    const specificQues = Questions.find(item => item.id==id)
    res.send(specificQues)
})
app.post('/contestAdd', async(req, res)=> {
    const body = req.body
    if(!body || !body.name || !body.time) {
        res.status(400).json({"msg":"All Fields are Required."})
    } else {
        const addData = await Model.create({
            name: body.name,
            time: body.time
        })
        res.status(200).json(addData)
    }
})
app.get('/contestResults', async(req,res)=> {
    const result = await Model.find({})
    res.status(200).send(result)
})

io.on('connection', (socket)=> {
    console.log(`${socket.id} has connected`)
    socket.broadcast.emit( 'other-connected' ,`${socket.id} just connected.`)

    const count = io.engine.clientsCount;
    io.emit('liveConnected', `${count} people live.`)

    socket.on('disconnect', ()=> {
        console.log(`${socket.id} has disconnected.`)
        socket.broadcast.emit('other-disconnected', `${socket.id} has disconnected.`)

        const count = io.engine.clientsCount;
        io.emit('liveConnected', `${count} people live.`)
    })

    socket.on('sendMessage', (e)=> {
        io.to(e.roomId).emit('receiveMessage', `${e.message}`)
    })


})

httpServer.listen(8000, ()=> console.log('Server Started...'))