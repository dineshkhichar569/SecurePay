import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password must be atleast 6 characters"],
    select: false,
  },
  
  profilePic: {
    type: String,
    
  },
  balance: {
    type: Number,
    default: 0
  },
  refreshToken:{
    type:String,
    select:false
  },
  fees: {
  tuition: {
    total: { 
      type: Number, 
      default: 0 
    },
    paid: { 
      type: Number, 
      default: 0 
    },
    due: { 
      type: Number, 
      default: 0 
    }
  },
  hostel: {
    total: { 
      type: Number, 
      default: 0 
    },
    paid: { 
      type: Number, 
      default: 0 
    },
    due: { 
      type: Number, 
      default: 0 
    }
  },
  exam: {
    total: { 
      type: Number, 
      default: 0 
    },
    paid: { 
      type: Number, 
      default: 0 
    },
    due: { 
      type: Number, 
      default: 0 
    }
  },
  library: {
    total: { 
      type: Number, 
      default: 0 
    },
    paid: { 
      type: Number, 
      default: 0 
    },
    due: { 
      type: Number, 
      default: 0 
    }
  },
  event: {
    total: { 
      type: Number, 
      default: 0 
    },
    paid: { 
      type: Number, 
      default: 0 
    },
    due: { 
      type: Number, 
      default: 0 
    }
  }
}
}, {
  timestamps: true
});


studentSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

studentSchema.methods.isPasswordCorrect = async function
(password){
   return await bcrypt.compare(password, this.password)
}

studentSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
           
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'
        }
    )
}

studentSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '1d'
        }
    )
}

export const Student = mongoose.model("Student", studentSchema);

