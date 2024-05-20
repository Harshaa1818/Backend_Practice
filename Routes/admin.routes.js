
import { Router } from 'express';
import { verifyJWT } from '../Middlewares/auth.js';
import { homepage, login, register, logout } from '../Controllers/admin.controller.js';

const adminrouter = Router();

adminrouter.route("/").get(homepage);
adminrouter.route("/login").post(verifyJWT,login);
adminrouter.route("/logout").get(verifyJWT,logout);

export {adminrouter}