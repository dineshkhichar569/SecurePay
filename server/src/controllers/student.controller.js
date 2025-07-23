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

const logoutUser = asyncHandler(async(req,res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
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
  const user = await User.findById(req.user?._id).select("+password");

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if(!isPasswordCorrect){
    throw new ApiError(401, "Old password is incorrect");
  }

const isSame = await user.isPasswordCorrect(newPassword);
  if (isSame) {
    throw new ApiError(400, "Old and new password cannot be the same");
  }

  user.password = newPassword;

  await user.save({validateBeforeSave: false});

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

    const existingUser = await User.findOne({email});

    if(!existingUser){
        throw new ApiError(400, "User with this email is not exist");
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.deleteMany({email}); // Clear any existing OTP for the email
    await OTP.create({email, otp});

    const subject = "OTP for resetting your SmartCart password";
    const html = `<p>Hello 👋,</p>

<p>We received a request to reset the password for your <strong>SmartCart</strong> account.</p>

<p>Your One-Time Password (OTP) for password reset is:</p>

<h2 style="color: #d9534f;">${otp}</h2>

<p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone to keep your account secure.</p>

<p>If you did not request a password reset, please contact our support team immediately or ignore this email.</p>

<p>Stay safe,<br>
Team SmartCart</p>`;

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
  const user = await User.findOne({ email }).select("+password");

  if(!user){
    throw new ApiError(404, "User does not exist");
  }

  const isSame = await user.isPasswordCorrect(newPassword);
  if (isSame) {
    throw new ApiError(400, "New password cannot be the same as the old password");
  }
  user.password = newPassword;
  await user.save({validateBeforeSave: false});
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

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(404, "Invalid refresh token");
    }

    if (!user.refreshToken || user.refreshToken !== incomingRefreshToken.trim()) {
      throw new ApiError(401, "Refresh token is expired or invalid");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export{
    generateAccessAndRefreshToken,
    sendOtp,
    verifyOtp,
    registerStudent,
    loginStudent
}