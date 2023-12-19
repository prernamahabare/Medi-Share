import mongoose from "mongoose";
import Medicine from "./medicineModule";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Enter the Name"],
    },
    username:{
        type: String,
        required: [true, "Enter the Username"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Enter the Password"],
    },
    email:{
        type: String,
        required: [true, "Enter the Password"],
        unique: true,
    },
    role:{
        type: String,
        required: [true, "Enter the Role"],
    },
    medicines:{
        type:  [Medicine.schema],
        required: [true, "Enter the Role"],
    }

})

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;