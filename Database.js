import mongoose from "mongoose";
import fetch from "node-fetch"
mongoose.connect("mongodb://127.0.0.1:27017/Assignment").then(()=>console.log("Connected"))
import schema from "./Schema.js"
async function getData(){
    const data=await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    const response=await data.json()
    //console.log(result)
    for(let i=0;i<response.length;i++){
        const sch=new schema({
            id:response[i]["id"],
            title:response[i]["title"],
            price:response[i]["price"],
            description:response[i]["description"],
            category:response[i]["category"],
            image:response[i]["image"],
            sold:response[i]["sold"],
            dateOfSale:response[i]["dateOfSale"]
        })
        await sch.save();
    }
}
getData();


