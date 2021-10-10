import express, {Request, Response} from "express";
import * as urlModel from "../models/url";
import {Url} from "../types/url";
const urlRouter = express.Router();

urlRouter.get("/", async (req: Request, res: Response) => {
    urlModel.findAll((err: Error, urls: Url[]) => {
        if (err) {
            return res.status(404).json({"errorMessage": err.message});
        }

        res.status(200).json({"data": urls});
    });
});

urlRouter.post("/", async (req: Request, res: Response) => {
    const newUrl: Url = req.body;
    urlModel.create(newUrl, (err: Error, url: Url) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).json({"data": url});
    });
});

urlRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    urlModel.findOne(id, (err: Error, url: Url) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json({"data": url});
    })
});

urlRouter.put("/:id", async (req: Request, res: Response) => {
    const url: Url = req.body;
    urlModel.update(url,true, (err: Error, url: Url) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).send({"data": url});
    })
});

export {urlRouter};