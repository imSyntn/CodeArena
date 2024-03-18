const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const { Topics } = require('./Topics.json')
const { Questions } = require('./QuestionData.json')

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

app.listen(8000, ()=> console.log('Server Started...'))