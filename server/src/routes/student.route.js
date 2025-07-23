import {Router} from 'express';

import { 
    sendOtp,
    verifyOtp,
    registerStudent
 } from '../controllers/student.controller.js';

 import{upload} from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
    
    registerStudent
)

router
.route("/send-otp")
.post(sendOtp);

router
.route("/verify-otp")
.post(verifyOtp)


export default router;
