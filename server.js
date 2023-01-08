// Hey, Utkarsh if you are reading thin is future, remember you are great.


var express = require('express');
var app = express();
var ejs = require("ejs");
const bodyParser = require('body-parser')
require('dotenv').config()


// to get css
app.use(express.static("public"));


// bodyparser
app.use(bodyParser.urlencoded({extended:true}));
// create application/json parser
var jsonParser = bodyParser.json()

app.set('view engine', 'ejs')





// Requiring Configuration and Open AI Api
const { Configuration, OpenAIApi } = require("openai");



// API KEY
const configuration = new Configuration({
    apiKey: process.env.encrypted_api_key,
  })


// Globla variable
var answer = [];
var getAiResponse = "";
var gptanswer = answer;

//  Routing
app.get('/', (req, res) => {
  res.render("index",{
    gptanswer : null,
})
});



app.post("/",function (req,res) {


  // This line helps to delet old answer as by deleting items from array
  answer.splice(0, answer.length);



  async function getAiResponse(topic) {
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: topic,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7
    });
    var respon = completion.data.choices[0].text;
    answer.push(respon)
    console.log(completion.status)

    res.render("index",{
      gptanswer : answer,
  })


  }
  getAiResponse(req.body.query);
  console.log(getAiResponse)
})











// Listining the app on port 3000
app.listen(3000, () => {
    console.log('Chatbot listening on port 3000!');
});
