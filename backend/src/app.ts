import "dotenv/config";
import express from "express";
import notesRoutes from "./routes/notes"
import morgan from "morgan"

const app = express();
app.use(morgan("dev"))


app.use(express.json());





app.use("/api/notes", notesRoutes)




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
