import express from "express"
import mongoose from "mongoose"
const app=express()
mongoose.connect("mongodb://127.0.0.1:27017/Assignment",{useNewUrlParser:true}).then(()=>console.log("Connected"))
import schema from"./Schema.js"

//Total sale amount of selected month
app.get("/statistics/:month",async(req,res)=>{
    //Here the month can also be number,we get the the month by using getMonth() function and month value starts from 0 i.e january=>0 february=>1
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
    //finding sale amount of month by summing up the prices of sold items
    var sales_amount=0;
    for(let i=0;i<month_sales.length;i++){
        if(month_sales[i]["sold"]==true){
            sales_amount=sales_amount+month_sales[i]["price"];
        }
    }
    var sold=0;
     for(let i=0;i<month_sales.length;i++){
         if(month_sales[i]["sold"]==true){
             sold=sold+1;
         }
     }
     var not_sold=0;
     for(let i=0;i<month_sales.length;i++){
         if(month_sales[i]["sold"]==false){
             not_sold=not_sold+1;
         }
     }
    return res.send({"sales_Amount":sales_amount,"no_of_sold_items":sold,"no_of_not_sold_items":not_sold});
})

app.listen(9001,()=>{
    console.log("Listening to port 9001");
})