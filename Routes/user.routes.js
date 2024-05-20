import { Router } from 'express';
import {  login, register, logout ,finduser,deleteuser} from '../Controllers/user.controller.js';
import { verifyJWT } from '../Middlewares/auth.js';

const userouter = Router();

//userouter.route("/").get(verifyJWT,homepage);
userouter.route("/login").post(login);
userouter.route("/register").post(register);
userouter.route("/logout").get(verifyJWT,logout);
userouter.route("/finduser/:username").get(finduser);
userouter.route("/deleteuser/:userid").post(deleteuser);


export {userouter}