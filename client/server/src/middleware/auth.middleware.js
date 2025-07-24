import { ApiError } from "../utills/ApiError.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { Student } from "../models/student.model.js";
import jwt from "jsonwebtoken";



export const verifyJWT = asyncHandler(async(req, res, next) => {
   try {
    const token = req.cookies?.accessToken  || req.header("Authorization")?.replace("Bearer","").trim();
 
    if(!token){
     throw new ApiError(401 , "Unauthorized request")
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
     
   const student =  await Student.findById(decodedToken?._id).select("-password -refreshToken")
   if(!student){
     // next_video: discuss about frontend
     throw new ApiError(401,"Invalid Access Token")
   }
 
   req.student = student;
   next()
   } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
   }
})


