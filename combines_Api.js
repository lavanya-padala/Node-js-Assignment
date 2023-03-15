import fetch from "node-fetch"
import express from "express"
const app=express()
app.get("/combined-api/:month",async(req,res)=>{
    const data=await fetch(`http://localhost:9001/statistics/${req.params.month}`)
    const response=await data.json()
    const data1=await fetch(`http://localhost:9002/barchart/${req.params.month}`)
    const response1=await data1.json()
    const data2=await fetch(`http://localhost:9000/piechart/${req.params.month}`)
    const response2=await data2.json()
    let result={...response,...response1,...response2}
    return res.send({"result":result})
})










app.listen(9010,()=>{console.log("Listening to port 9010")});