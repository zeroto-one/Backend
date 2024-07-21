import express from "express";
import { router } from "./routes/url.routes.js";
import { connectToMongoDB } from "./connect.js";
import { Url } from "./models/url.models.js";
import path    from     "path";
import { staticRouter } from "./routes/staticRouter.js";

const app = express();
const urlRoutes = router;
const PORT = 3002;

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));
app.use(express.json()); // Middleware to parse JSON
app.use("/url", urlRoutes);
app.use("/",staticRouter);
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("Connected to DB"))
  .catch(error => console.log("Error:", error));

  app.get("/test", async (req, res) => {
    const allUrl = await Url.find({});
    console.log(allUrl, "one");
    return res.render('home', {
        urls: allUrl,
        name: "dipendra",
    });
});
app.get("/:shortID", async (req, res) => {
    const shortID = req.params.shortID;
    console.log("Received request for shortID:", shortID);

    if (!shortID) {
        console.log("No shortID found in the request");
        return res.status(400).send("shortID is required");
    }

    try {
        const entry = await Url.findOne(
            { "shortID":shortID}
            // {
            //     $push: {
            //         visitHistory: {
            //             timestamp: Date.now()
            //         }
            //     }
            // },
            //{ new: true } // This option returns the updated document
        );
        console.log(entry);
        if (entry) {
            console.log("Redirecting to:", entry.redirectUrl);
            return res.redirect("http://"+entry.redirectUrl);
        } else {
           
            console.log("No entry found for shortID:", shortID);
            res.status(404).send("URL not found");
        }
    } catch (error) {
        console.error("Error during database operation:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
