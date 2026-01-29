const express=require("express");
const app=express();
app.use(express.json())
app.use(express.urlencoded())

app.get("/",(req,res)=>{
    res.send("hello im get apis ")
})

app.get("/user/:id/:name",(req,res)=>{
    res.send({param:req.params,query:req.query})
})
app.post("/",(req,res)=>{
res.json({name:"naresh",id:1})
})
app.put("/",(req,res)=>{
res.status(400).json({name:"naresh",id:1})
})

app.delete("/",(req,res)=>{
res.status(401).send("im delete api")
})

app.listen(3000,()=>{
    console.log("Server is runing");
})