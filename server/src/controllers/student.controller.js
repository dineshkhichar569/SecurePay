import {asyncHandler} from "../utills/asyncHandler.js";
import{ApiError} from "../utills/ApiError.js"
import { Student } from "../models/student.model.js";
import {ApiResponse} from "../utills/ApiResponse.js"
import jwt from "jsonwebtoken";
import sendEmail from "../utills/sendEmail.js";
import { OTP } from "../models/otp.model.js";
import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import { Transaction } from "../models/transaction.model.js";







const generateAccessAndRefreshToken = async (studentId) =>{
    try{
        const student = await Student.findById(studentId)
        const accessToken = student.generateAccessToken()
        const refreshToken = student.generateRefreshToken()

        student.refreshToken = refreshToken
        await student.save({validateBeforeSave : false})

        return {accessToken, refreshToken}
    
    }
    catch(error){
        throw new ApiError(500, "Something went wrong while generate access and refresh token");
    }
};


const registerStudent = asyncHandler(async (req, res) => {
  const { fullname, email, phone, studentId, password } = req.body;

  if (!fullname || !email || !phone || !studentId || !password) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  const existingStudent = await Student.findOne({ $or: [{ email }, { studentId }] });
  if (existingStudent) {
    return res.status(409).json({ success: false, message: "Student already registered" });
  }

  const student = await Student.create({ 
    fullname, 
    email, 
    phone, 
    studentId, 
    password 
});

const createdStudent = await Student.findById(student._id).select("-password -refreshToken");
  if (!createdStudent) {
    throw new ApiError(500, "Something went wrong while registering student");
  }

  return res
  .status(201)
  .json(
    new ApiResponse(
        200,
        createdStudent,
        "Student registered successfully"
    )
  );
});

const loginStudent = asyncHandler(async (req, res) => {
   
const {email,  password} = req.body
console.log("Received req.body:", req.body);


if(!email){
    throw new ApiError(400," email is required" )
}

const student = await Student.findOne({email}).select("+password +refreshToken")
if(!student){
    throw new ApiError(404, "Student does not exist")
}

const isPasswordValid = await student.isPasswordCorrect(password)
if(!isPasswordValid){
    throw new ApiError(401, "Invalid student credentials")
}

const {accessToken, refreshToken} = await generateAccessAndRefreshToken(student._id)

const loggedInStudent = await Student.findById(student._id).select("-password -refreshToken")

const options = {
    httpOnly: true,
    secure: false,
}

return res
.status(200)
.cookie("accessToken",accessToken, options)
.cookie("refreshToken",refreshToken, options)
.json(
    new ApiResponse(
        200,
        {
            user: loggedInStudent, accessToken, refreshToken
        },
        "Student logged in Successfully"
    )
)

});

const logoutStudent = asyncHandler(async(req,res) =>{
    await Student.findByIdAndUpdate(
        req.student._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    ) 
    const options = {
    httpOnly: true,
    secure: true,
}

return res
.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(new ApiResponse(200, {}, "User logout Successfully"))
    
});

const changeCurrentPassword = asyncHandler(async (req, res)=>{

  const {oldPassword, newPassword} = req.body;
  if(!(oldPassword && newPassword)){
    throw new ApiError(400, "Old password and new password are required");
  }
  const student = await Student.findById(req.student?._id).select("+password");

  const isPasswordCorrect = await student.isPasswordCorrect(oldPassword);

  if(!isPasswordCorrect){
    throw new ApiError(401, "Old password is incorrect");
  }

const isSame = await student.isPasswordCorrect(newPassword);
  if (isSame) {
    throw new ApiError(400, "Old and new password cannot be the same");
  }

  student.password = newPassword;

  await student.save({validateBeforeSave: false});

  return res 
  .status(200)
  .json(
    new ApiResponse(
      200,
      {},
      "Password changed successfully"
    )
  )


});

const sendResetOtp = asyncHandler(async (req, res)=>{
  const {email} = req.body;
    
    if(!email){
        throw new ApiError(400, "Email is required");
    }

    const existingStudent = await Student.findOne({email});

    if(!existingStudent){
        throw new ApiError(400, "Student with this email is not exist");
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.deleteMany({email}); // Clear any existing OTP for the email
    await OTP.create({email, otp});

    const subject = "OTP for resetting your Secure-Pay password";
    const html = `<p>Hello 👋,</p>

<p>We received a request to reset the password for your <strong>Ssecure-Pay</strong> account.</p>

<p>Your One-Time Password (OTP) for password reset is:</p>

<h2 style="color: #d9534f;">${otp}</h2>

<p>This OTP is valid for <strong>1 minutes</strong>. Please do not share it with anyone to keep your account secure.</p>

<p>If you did not request a password reset, please contact our support team immediately or ignore this email.</p>

<p>Stay safe,<br>
Team Secure-Pay</p>`;

    await sendEmail(email, subject, html);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            null, 
            "OTP sent successfully to your email"
        ));
});

const verifyResetOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new ApiError(400, "Email and OTP are required");
  }
  const existingOtp = await OTP.findOne({ email });
  if (!existingOtp || existingOtp.otp !== otp) {
    throw new ApiError(400, "Invalid  OTP");
  }

  if (existingOtp.expiresAt < Date.now()) {
    await OTP.deleteOne({ email });
    throw new ApiError(400, "OTP has expired. Please request a new one.");
  }

  await OTP.deleteOne({ email });

  return res.status(200).json(
    new ApiResponse(200, null, "OTP verified successfully")
  );
});

const resetPassword = asyncHandler(async (req, res)=>{
  const {email, newPassword} = req.body;
  if(!(email && newPassword)){
    throw new ApiError(400, "Email and new password are required");
  }
  const student = await Student.findOne({ email }).select("+password");

  if(!student){
    throw new ApiError(404, "Student does not exist");
  }

  const isSame = await student.isPasswordCorrect(newPassword);
  if (isSame) {
    throw new ApiError(400, "New password cannot be the same as the old password");
  }
  student.password = newPassword;
  await student.save({validateBeforeSave: false});
  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      {},
      "Password reset successfully"
    )
  );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken || req.query.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const student = await Student.findById(decodedToken?._id);

    if (!student) {
      throw new ApiError(404, "Invalid refresh token");
    }

    if (!student.refreshToken || student.refreshToken !== incomingRefreshToken.trim()) {
      throw new ApiError(401, "Refresh token is expired or invalid");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(student._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiRespon+se(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getCurrentStudent = asyncHandler(async (req, res)=> {
  if (!req.student) {
    throw new ApiError(401, "Student not authenticated");
  }
  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      req.student,
      "Current student fetched successfully"
    )
  )
});

const updateAccountDetails = asyncHandler(async(req, res)=>{
  const {fullname, phone,email} = req.body;

  if(!(fullname  || phone || email)){
    throw new ApiError(400, "At least one field is required to update");
  }
  const studentId = req.student?._id;
  const student = await Student.findById(req.student?._id).select("-password -refreshToken");
  if (!student) {
    throw new ApiError(404, "Student not found");
  }
  if (email && email !== student.email) {
    const emailExists = await Student.findOne({ email });
    if (emailExists && emailExists._id.toString() !== studentId.toString()) {
      throw new ApiError(400, "Email is already taken");
    }
  }

  

  const updatedStudent = await Student.findByIdAndUpdate(
    req.student?._id,
  {
    $set:{
      fullname: fullname || student.fullname,
      phone: phone || student.phone,
      email: email || student.email
    }
  },
  {new: true}
).select("-password -refreshToken");

return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      updatedStudent,
      "Student account details updated successfully"
    )
)
});

const getFeeSummary = asyncHandler(async (req, res)=>{
  const studentId = req.student._id;
  const student = await Student.findById(studentId).select("fees")

  if(!student){
    throw new ApiError(404, "Student not found");
  }
  return res
  .status(200)
  .json({
    success:true,
    data: student.fees
  })
})

const updateFeeAfterPayment = asyncHandler(async(req, res)=>{
  const {category, amount} = req.body;
  const student = await Student.findById(req.student._id);
  if(!student){
    throw new ApiError(404, "Student not found");
  }
  if(!student.fees[category]){
    throw new ApiError(404,"Invalid fee category")
  }
  student.fees[category].paid += amount;
  student.fees[category].due -= amount;
  await student.save();

  return res 
  .status(200)
  .json({
    success: true,
    message: `Updated ${category} fee Successfully`,
    data: student.fees[category]
  })

})

const dummyPayment = asyncHandler(async (req, res) => {
  
    const {  amount } = req.body;
    const studentId = req.student._id
    
    const isFraud = amount > 50000;

    const transaction = await Transaction.create({
      studentId,
      amount,
      status: "success",
      isFraud,
    });

    return res.status(200).json({
      success: true,
      message: "Dummy payment completed",
      transactionId: transaction._id,
      isFraud,
    });
   
});


const transactionHistoryController = asyncHandler(async(req, res)=>{
  const transactions = await Transaction.find({studentId: req.student._id}).sort({createdAt:-1});

  return res
  .status(200)
  .json({
    success:true,
    transactions
  })
})

const generateReceiptController = asyncHandler(async(req, res) =>{
  const{id} = req.params;
  const transaction = await Transaction.findById(id).populate(studentId)
    if(!transaction || transaction.studentId._id.toString() !== req.student._id.toString()){
      throw new ApiError(404, "Transaction not found")
    }
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=receipt-${id}.pdf`);
    doc.fontSize(20).text("SecurePay - Payment Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Transaction ID: ${transaction._id}`);
    doc.text(`Student: ${transaction.studentId.name} (${transaction.studentId.email})`);
    doc.text(`Amount: ₹${transaction.amount}`);
    doc.text(`Date: ${transaction.createdAt.toLocaleString()}`);
    doc.text(`Fraud Detected: ${transaction.isFraud ? "Yes" : "No"}`);
    doc.end();
})







export{
    generateAccessAndRefreshToken,
    registerStudent,
    loginStudent,
    logoutStudent,
    sendResetOtp,
    verifyResetOtp,
    resetPassword,
    changeCurrentPassword,
    refreshAccessToken,
    getCurrentStudent,
    updateAccountDetails,
    getFeeSummary,
    updateFeeAfterPayment,
    dummyPayment,
    transactionHistoryController,
    generateReceiptController
}