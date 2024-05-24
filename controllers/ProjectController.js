import ProjectModel from "../models/Project.js"


export const getAll = async (req, res) => {
    try{
        const projects = await ProjectModel.find().populate('user').exec();


        res.json(projects)

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить проекты",
        })
    }
}


export const getOne = async (req, res, next) => {
    try{

        const projectId = req.params.id

        const project = await ProjectModel.findById(projectId).populate('user').exec();

        if(!project){
            res.status(404).json({
                message: "Не удалось найти проект",
            })
        }

        res.json(project)

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить проект",
        })
    }
}


export const remove = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const doc = await ProjectModel.findOneAndDelete({ _id: projectId });

        if (!doc) {
            return res.status(404).json({
                message: "Не удалось найти проект",
            });
        }

        res.json({
            success: true,
            message: 'Проект успешно удален'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Не удалось удалить проект",
        });
    }
}


export const create = async (req, res) => {
    try{

        const doc = new ProjectModel({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            gitLink: req.body.gitLink,
            hostLink: req.body.hostLink,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })

        const project = await doc.save()

        res.json(project)

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать проект",
        })
    }
}


export const update = async (req, res) => {
    try{
        const projectId = req.params.id

        await ProjectModel.updateOne({
            _id: projectId,
        }, {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            gitLink: req.body.gitLink,
            hostLink: req.body.hostLink,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })


        res.json({
            success: true,
        });


    } catch(err){
        console.error(err);
        res.status(500).json({
            message: "Не удалось обновить проект",
        });
    }
}