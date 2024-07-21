import mongoose from "mongoose";

const urlSchema= new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:[
        {timestamp:{type:Number}}
    ],
},{timeseries:true});
export const Url=mongoose.model("Url",urlSchema);
//export default Url;