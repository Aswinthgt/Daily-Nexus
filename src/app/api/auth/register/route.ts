import { NextResponse, NextRequest } from "next/server";
import connectDb from "@/dbconfig/dbconfig";
import userAuth from "@/dbconfig/models/auth";
import { parse } from "url";
import { decrypt, encrypt } from "@/helper/encrypt";
import cache from "memory-cache"
import { sendMail } from "@/helper/nodemailer";
import bcrypt from "bcrypt"

connectDb();

export async function POST(req: NextRequest) {
    try {
        
        const reqBody = await req.json();
        const { userName, email, password } = reqBody;

        const oldUser = await userAuth.findOne({ email: email });
      
        if (oldUser) {
            return NextResponse.json({ message: "user already Exist" }, { status: 400 });
        }
   
        const encryptKey = encrypt(email, process.env.SECRET_encryptionKey);
        const cached = await cache.put(email, { userName, email, password }, 60 * 3000);

        if (!encryptKey && !cached) {
            return NextResponse.json({ message: "Registration Failed", status: 406 })
        }

        const mailConfirm = await sendMail(`${process.env.URL}/api/auth/register?token=${encryptKey}`, email);

        if (mailConfirm) {
            return NextResponse.json({ message: "Check Your Mail To Verify Your Account", status: 200 })
        } else {
            return NextResponse.json({ message: "Registration Failed", status: 400 })
        }


    } catch (er) {
        return NextResponse.json({ message: `${er}`, status: 400 })
    }

}


export async function GET(req: NextRequest) {



    const {query} =  parse(req.url,true);
    const token =  query.token;
    
    const decryptdata = decrypt(token,process.env.SECRET_encryptionKey)
    const userdata = cache.get(decryptdata)
    
    if(!userdata){
        return NextResponse.redirect(new URL(process.env.URL!))
    }
     
    const { email, userName, password } = userdata

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt)

    const newUser = new userAuth({
        userName: userName,
        email: email,
        password: hashpassword
    })

    const saveResponse = await newUser.save();
    const encryptMessage = "Registered Sucesfully Please Login"
    if (saveResponse) {
        return NextResponse.redirect(new URL(`${process.env.URL!}/auth/login?message=${encryptMessage}`))
    } else {
        return NextResponse.redirect(new URL(process.env.URL!))
    }

}