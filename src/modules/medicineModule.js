import mongoose from "mongoose";

const medicineSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Enter the MedicineName"],
    },
    purposeofmedicine:{
        type: String,
        required: [true, "Enter the Purpose of Medicine"],
    },
    dateofmanifacture:{
        type: Date,
        required: [true, "Enter the Date of Manifacture"],
    },
    dateofexpiry:{
        type: Date,
        required: [true, "Enter the Date of Expiry"],
    }

})

const Medicine = mongoose.models.medicines || mongoose.model('medicines', medicineSchema);

export default Medicine;