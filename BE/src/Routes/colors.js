import { Router } from "express";
import ColorController from "../Controllers/colors.js";

const router = Router();

router.get("/list", async (req, res) => {
    const result = await ColorController.getAll();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    const result = await ColorController.getById(req.query.id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    const token = req.headers.authorization;
    const result = await ColorController.create(token, req.body);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    const token = req.headers.authorization;
    const result = await ColorController.update(token, req.body);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    const token = req.headers.authorization;
    const result = await ColorController.delete(token, req.body);
    res.status(result.status).json(result);
});

export default router;