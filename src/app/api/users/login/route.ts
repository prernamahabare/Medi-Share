import { connect } from '@/dbconfig/dbconfig';
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from '@/modules/userModule';
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email, password, role } = reqbody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" },
                { status: 400 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Password does not match" },
                { status: 400 });
        }

        if (role !== user.role) {
            return NextResponse.json({ error: "Unauthorized: Role mismatch" }, { status: 401 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login Succesfully!",
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}
