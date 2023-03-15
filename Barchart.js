import express from "express"
import mongoose from "mongoose"
const app=express()
mongoose.connect("mongodb://127.0.0.1:27017/Assignment",{useNewUrlParser:true}).then(()=>console.log("Connected"))
import schema from"./Schema.js"

app.get("/barchart/:month",async(req,res)=>{
    const array=["january","february","march","april","may","june","july","august","september","october","november","december"]
    let month;
    for(let i=0;i<array.length;i++){
        if(array[i]==req.params.month){
            month=i;
        }
    }
    const month_sales=[]
    //getting all the data
    const data=await schema.find({})
    //filtering data besed on month
    for(let i=0;i<data.length;i++){
        var date=new Date(data[i]["dateOfSale"])
        if(date.getMonth()==month){
            month_sales.push(data[i])
        }
    }
    const data1=[]
    function barchart(a,b){
        if(a>=0 && b<=900){
            let items=0,key;
            for(let i=0;i<month_sales.length;i++){
                if(month_sales[i]["price"]>=a && month_sales[i]["price"]<=b ){
                    items=items+1;
                }
            }
            key=a+"-"+b;
            data1.push({[key]:items})
            a=b+1;
            b=b+100;
            barchart(a,b);
        }
    }
    barchart(0,100);
    var items1=0;
    for(let i=0;i<month_sales.length;i++){
        if(month_sales[i]["price"]>901){
            items1=items1+1;
        }
    }
    data1.push({"901-above":items1})
    return res.send({"barchart":data1})
})
app.listen(9002,()=>{
    console.log("Listening to port 9002");
})