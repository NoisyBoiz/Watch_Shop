import { Router } from "express";
import adminsController from "../Controllers/admins.js";

const router = Router();

router.post("/login", async (req, res) => {
    const result = await adminsController.login(req.body);
    res.status(result.status).json(result);
});

router.post("/logout", async (req, res) => {
    const token = req.headers.authorization;
    const result = await adminsController.logout(token);
    res.status(result.status).json(result); 
});

router.put("/changePassword", async (req, res) => {
    const token = req.headers.authorization;
    const result = await adminsController.changePassword(token, req.body);
    res.status(result.status).json(result);
});

router.put("/changeName", async (req, res) => {
    const token = req.headers.authorization;
    const result = await adminsController.changeName(token, req.body);
    res.status(result.status).json(result);
});

export default router;