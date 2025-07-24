import {asyncHandler} from "../utills/asyncHandler.js";
import{ApiError} from "../utills/ApiError.js"
import { Student } from "../models/student.model.js";
import{uploadOnCloudinary} from "../utills/cloudinary.js"
import {ApiResponse} from "../utills/ApiResponse.js"
import jwt from "jsonwebtoken";
import sendEmail from "../utills/sendEmail.js";
import { OTP } from "../models/otp.model.js";
import cloudinary from "cloudinary";

import mongoose from "mongoose"



const generateAccessAndRefreshToken = async (userId) =>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return {accessToken, refreshToken}
    
    }
    catch(error){
        throw new ApiError(500, "Something went wrong while generate access and refresh token");
    }
};

const sendOtp = asyncHandler(async (req, res) => {
    const {email} = req.body;
    
    if(!(email )){
        throw new ApiError(400, "Email is required");
    }

    const existingStudent = await Student.findOne({email});

    if(existingStudent){
        throw new ApiError(400, "Student with this email is already exist");
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.deleteMany({email}); 
    await OTP.create({email, otp});

    const subject = "Verify your email to complete registration - Secure-Pay";
    const html = `<p>Hello 👋,</p>
                  <p>Thank you for choosing <strong>Secure-Pay</strong>.</p>
                  <p>Your One-Time Password (OTP) to complete your sign-up is:</p>
                  <h2 style="color: #007bff;">${OTP}</h2>
                  <p>This OTP is valid for <strong>1 minutes</strong>. Please do not share this code with anyone.</p>
                  <p>If you did not initiate this request, please ignore this email.</p>
                  <p>Regards,<br> Team SmartCart</p>`;

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

const verifyOtp = asyncHandler(async (req, res) => {

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

export{
    generateAccessAndRefreshToken,
    sendOtp,
    verifyOtp,
    registerStudent
}