const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
   airLine:{
    type:String,
   },
   flightNo:{
    type:Number,
   },
   price:{
    type:Number,  
   }

    

});
const Flight=mongoose.model('Flight', userSchema);
module.exports=Flight;
