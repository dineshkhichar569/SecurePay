import {Router} from 'express';

import {
    registerStudent,
    loginStudent,
    getFeeSummary,
    updateFeeAfterPayment,
    createOrder,
    changeCurrentPassword,
    verifyResetOtp,
    sendResetOtp,
    resetPassword,
    refreshAccessToken,
    logoutStudent,
    getCurrentStudent,
    updateAccountDetails,
    dummyPayment,
    transactionHistoryController,
    generateReceiptController
 } from '../controllers/student.controller.js';

 
import { verifyJWT } from "../middleware/auth.middleware.js";
import { fraudDetector } from '../middleware/fraudDetector.middleware.js';


const router = Router();

router.route("/register").post(
    
    registerStudent
)



router
.route("/login")
.post(loginStudent);

router
.route("/fee-summary")
.get(
    verifyJWT,
    getFeeSummary
)

router
.route("/update-fee")
.post(
    verifyJWT,
    updateFeeAfterPayment
)

router
.route("/send-reset-otp")
.post(sendResetOtp);

router
.route("/create-order")
.post(createOrder);

router
.route("/verify-reset-otp")
.post(verifyResetOtp);

router
.route("/reset-password")
.post(resetPassword);


router
.route("/logout")
.post(
    verifyJWT, 
    logoutStudent
)

router
.route("/change-password")
.post(
    verifyJWT, 
    changeCurrentPassword
)

router
.route("/refresh-token")
.post(
    refreshAccessToken
)

router
.route("/update-account")
.patch(
    verifyJWT,
    updateAccountDetails
)

router
.route("/get-student")
.get(
    verifyJWT,
    getCurrentStudent
)

router
.route("/dummy-payment")
.post(
    verifyJWT,
    fraudDetector,
    dummyPayment
)

router
.route("/transaction-history")
.get(
    verifyJWT,
    transactionHistoryController
)

router
.route("/receipt/:id")
.get(
    verifyJWT,
    generateReceiptController
)

export default router;
