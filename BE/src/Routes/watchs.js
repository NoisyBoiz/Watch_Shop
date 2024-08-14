import { Router } from "express";
import WatchController from "../Controllers/watchs.js";

const router = Router();

router.get("/list", async (req, res) => {
    const result = await WatchController.getAll();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    const result = await WatchController.getById(req.query.id);
    res.status(result.status).json(result);
});

router.get("/getByName", async (req, res) => {
    const result = await WatchController.getByName(req.query.name);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    const token = req.headers.authorization;
    const result = await WatchController.create(token, req.body);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    const token = req.headers.authorization;
    const result = await WatchController.update(token, req.body);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    const token = req.headers.authorization;
    const result = await WatchController.delete(token, req.body);
    res.status(result.status).json(result);
});

export default router;