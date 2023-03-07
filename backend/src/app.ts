import "dotenv/config";
import express from "express";
import NoteModel from "./models/note";

const app = express();

app.get("/", async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next)=>{
    next(Error("Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error,req: express.Request,res: express.Response,next: express.NextFunction) => {
    console.error(error);
    let errorMessage= "An unknown error occured"
    if(error instanceof Error){
        errorMessage=error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
);

export default app;
