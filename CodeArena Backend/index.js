const express = require('express')
const app = express();
const cors = require('cors')
const { Topics } = require('./Topics.json')
const { Questions } = require('./QuestionData.json')

app.use(cors({
    origin: '*'
}))

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

app.listen(8000, ()=> console.log('Server Started...'))