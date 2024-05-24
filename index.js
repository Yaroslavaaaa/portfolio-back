import express from "express"
import mongoose from "mongoose";
import { registerValidation, loginValidation, projectCreateValidation } from './validations/validations.js'
import checkUpAuth from './utils/checkUpAuth.js'
import * as UserController from './controllers/UserController.js'
import * as ProjectController from './controllers/ProjectController.js'
import multer from 'multer'
import handleValidationErrors from './utils/handleValidationErrors.js'
import cors from 'cors'


mongoose.connect('mongodb+srv://admin:1234@portfolio.yjucukm.mongodb.net/portfolio?retryWrites=true&w=majority&appName=portfolio')
.then(() => console.log("DB ok"))
.catch((err) => console.log("DB error", err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))


app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login )
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register)
app.get("/auth/profile", checkUpAuth, UserController.getProfile);


app.post('/upload', checkUpAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
})


app.get("/projects", ProjectController.getAll)
app.get("/projects/:id", ProjectController.getOne)
app.post("/projects", checkUpAuth, projectCreateValidation, handleValidationErrors, ProjectController.create)
app.delete("/projects/:id", checkUpAuth, ProjectController.remove)
app.patch("/projects/:id", checkUpAuth, projectCreateValidation, handleValidationErrors, ProjectController.update)



app.listen(4000, (err) => {
    if(err) {
        return console.log(err);
    }


    console.log("Server OK");
})