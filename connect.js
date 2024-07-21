import mongoose from "mongoose";

export async function connectToMongoDB(url) {
    console.log("Connecting to DB...");
    await mongoose.connect(url);
    console.log("Connected to DB");

    const exampleSchema = new mongoose.Schema({ name: String });
    const ExampleModel = mongoose.model("Example", exampleSchema);

    const exampleDoc = new ExampleModel({ name: "Test" });
    await exampleDoc.save(); // This creates the database
}
