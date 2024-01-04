import { connect } from '@/dbconfig/dbconfig'
import bcryptjs from "bcryptjs";
import User from '@/modules/userModule'
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, username, password, email, role, medicines} = reqBody;

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exist" },
                { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            username,
            email,
            password: hashPassword,
            role,
            medicines,
        })

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created Succesfully",
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}
