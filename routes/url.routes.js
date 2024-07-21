import express from "express";
import{handleGenrateNewShortUrl} from "../controlers/url.controlers.js"
 export const router=express.Router();
router.post("/",handleGenrateNewShortUrl);
