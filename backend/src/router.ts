// Imports
import { Router } from "express";

// Import das controllers
import UserInstant from "./controllers/UserController";
import PostInstant from "./controllers/PostsController";
import AuthenticationInstant from "./controllers/AuthController";

// Inicia o router
const router = Router();

// Rota de login
router.post("/login", AuthenticationInstant.create);

// Rotas de usuário
router.post("/user/instant", UserInstant.create);
router.get("/user/instant", UserInstant.read);
router.put("/user/instant", UserInstant.update);
router.delete("/user/instant", UserInstant.delete);

// Rotas de posts
router.post("/posts/instant", PostInstant.create);
router.get("/posts/instant", PostInstant.read);
router.put("/posts/instant", PostInstant.update);
router.delete("/posts/instant", PostInstant.delete);

export default router;
