import express, {Request, Response} from "express";
import * as urlModel from "../models/url";
import {Url} from "../types/url";
const urlRouter = express.Router();

urlRouter.get("/", async (req: Request, res: Response) => {
    console.log('get /')
    urlModel.findAll((err: Error, urls: Url[]) => {
        if (err) {
            return res.status(404).json({"errorMessage": err.message});
        }

        res.status(200).json({"data": urls});
    });
});

urlRouter.post("/", async (req: Request, res: Response) => {
    console.log('post /')
    const newUrl: Url = req.body;
    console.log('newUrl: ', newUrl)

    urlModel.findOneByUrl(newUrl, (err: Error, url: Url) => {
        if (err) {
            urlModel.create(newUrl, (err: Error, url: Url) => {
                if (err) {
                    return res.status(500).json({"message": err.message});
                } else {
                    res.status(200).json({"data": url});
                }
            });
        } else {
            res.status(200).json({"data": url});
        }
    })
});

urlRouter.post("/short", async (req: Request, res: Response) => {
    console.log('post /short')
    console.log('req.body: ', req.body)
    const short = req.body.short.toString()
    urlModel.findOneByShortUrl(short, (err: Error, url: Url) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json({"data": url});
    })
});

urlRouter.put("/:id", async (req: Request, res: Response) => {
    console.log('get /:id')
    const url: Url = req.body;
    urlModel.update(url,true, (err: Error, url: Url) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).send({"data": url});
    })
});

export {urlRouter};