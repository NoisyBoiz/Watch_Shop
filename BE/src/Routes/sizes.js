import { Router } from "express";
import SizeController from "../Controllers/sizes.js";

const router = Router();

router.get("/list", async (req, res) => {
    const result = await SizeController.getAll();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    const result = await SizeController.getById(req.query.id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    const token = req.headers.authorization;
    const result = await SizeController.create(token, req.body);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    const token = req.headers.authorization;
    const result = await SizeController.update(token, req.body);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    const token = req.headers.authorization;
    const result = await SizeController.delete(token, req.body);
    res.status(result.status).json(result);
});

export default router;