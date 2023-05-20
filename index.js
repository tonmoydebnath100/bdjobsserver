const express = require("express");
const cors = require("cors");
const port= process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app=express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://bookstore:2y_We7EFZrZf_YB@cluster0.mpylzkg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const store=client.db('Bookstore').collection('books');
    
    app.post('/store', async(req,res)=>{
      const book=req.body;
      console.log(book);
      const result= await store.insertOne(book);
      res.send(result);
    });
    app.get('/search', async(req,res)=>{
      const search=req.query.name;
      const search1=req.query.age;
      const search2=req.query.book;
      console.log(search);
      const query= {bookname:search};
      const r=await store.find(query).toArray();
      console.log(r);
      res.send(r);
    });
  }
  finally{

  }
}
run().catch(console.log);

app.get('/',async(req,res)=>{
  res.send('server is running');
})

app.listen(port,()=> console.log('portal running'));