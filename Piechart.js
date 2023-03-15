import express from "express"
import mongoose from "mongoose"
const app=express()
mongoose.connect("mongodb://127.0.0.1:27017/Assignment",{useNewUrlParser:true}).then(()=>console.log("Connected"))
import schema from"./Schema.js"
app.get("/piechart/:month",async(req,res)=>{
    var categories=[]
    const data=await schema.find({})
    for(let i=0;i<data.length;i++){
        if(categories.length==0){
            categories.push(data[i]["category"])
        }
        else{
            var value1=0;
            for(let j=0;j<categories.length;j++){
                if(categories[j]==(data[i]["category"])){
                    value1=1;
                }
            }
            if(value1==0){
                categories.push(data[i]["category"])
            }
        }
    }
    const array=["january","february","march","april","may","june","july","august","september","october","november","december"]
    let month;
    for(let i=0;i<array.length;i++){
        if(array[i]==req.params.month){
            month=i;
        }
    }
    const month_sales=[]
    //filtering data besed on month
    for(let i=0;i<data.length;i++){
        var date=new Date(data[i]["dateOfSale"])
        if(date.getMonth()==month){
            month_sales.push(data[i])
        }
    }
    const piedate=[]
    let value2=0;
    for(let i=0;i<categories.length;i++){
        value2=0;
        for(let j=0;j<month_sales.length;j++){
            if((month_sales[j]["category"])==categories[i]){
                value2=value2+1;
            }
        }
        piedate.push({[categories[i]]:value2})
    }
    return res.send({"piedata":piedate});
})








app.listen(9000,()=>{
    console.log("Listening to port 9000");
})