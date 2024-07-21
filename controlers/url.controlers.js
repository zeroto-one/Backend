import {nanoid} from "nanoid";
import{Url} from "../models/url.models.js";
 export async function handleGenrateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({error:'url is required'});
    const shortID=nanoid(8);
    await Url.create({
        shortID:shortID,
        redirectUrl:body.url,
        visitHistory:[],
    });
    return res.json({id:shortID});
}