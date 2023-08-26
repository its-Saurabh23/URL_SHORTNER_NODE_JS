const express = require('express');
const mongooes = require('mongoose');
const Shortid = require('shortid');
const app = express();

app.use(express.json());
const PORT = 5000;


// set connection with mongodb       use your mongodb name or password for connection  
mongooes.connect("mongodb+srv://username:<password>@cluster0.9grkeb7.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const urlSchema = new  mongooes.Schema({
    oroginalUrl : String,
    shortenUrl  : String
})
 
// model
  const Url = mongooes.model('Url',urlSchema)

// test purpose route
// app.get('',(req,resp)=>{
//     resp.send("Working")
// })


// take the input form user 
app.post('/shorten', async (req,resp)=>{

    const {oroginalUrl} = req.body;
    const shortenUrl = Shortid.generate();

    const url = new Url({
        oroginalUrl,
        oroginalUrl
      }) 

     await url.save();
     resp.json({shortenUrl});
})

app.get('/:id',async (req,resp)=>{
    const { id } = req.params;
    const url = await Url.findOne({shortenUrl:id});

    if(url){
        resp.redirect(url.oroginalUrl);
    }else{
        resp.status(404).json({message:" URL Not Found"}); 
    }
});



app.listen(PORT,()=>{
    console.log(`Server is runing on ${PORT} `)
})


 