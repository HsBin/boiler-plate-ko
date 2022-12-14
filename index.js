const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded 분석해서 가져올수 있게한것.
app.use(bodyParser.urlencoded({extended: true}));

//application/json 
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, { useNewUrlParser: true
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

// mongodb+srv://Changikbin:<password>@yikbinstudy.9udvic0.mongodb.net/?retryWrites=true&w=majority

app.get('/', (req, res) => res.send('Hello World! hehe'))

app.post('/register', (req, res) => {
    //회원가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    
    const user = new User(req.body) // bodyparser이용

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({ // status200은 성공했다는 표시
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))