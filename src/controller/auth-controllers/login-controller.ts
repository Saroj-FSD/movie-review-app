import { Request, Response, NextFunction } from "express";
import { userMongoService } from "../../mongo/auth/service";
import { comparePassword } from "../../utils/bcrypt";
import { generateToken, TPayload } from "../../utils/jwt";
import { EXPIRY_TIME_IN_SECONDS } from "../../utils/constants";
import { TokenService } from "../../mongo/auth/token-service";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    // validate the user in database
    const user = await userMongoService.getUserByEmail({
        email: body.email,
    });
    if(!user){
        res.status(404).json({
            message: "User not found",
        })
        return
    }

    const isPasswordCorrect = await comparePassword({
      hashedPassword: user.password,
      plainTextPassword: body.password
    })

    if(!isPasswordCorrect){
      res.status(400).json({
        message: `Incorrect email or password`,
      })
      return
    }

    const userPayload: TPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    }

    const token = generateToken(userPayload)

    console.log("generate token",token)

    const Bearertoken = `Bearer ${token}`

    res.cookie("authorization", Bearertoken,{
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + EXPIRY_TIME_IN_SECONDS*1000),
      sameSite: "lax",
      // production huda true, development huda false 
      secure: process.env ["ENVIRONMENT"] === "dev"
    })

    await TokenService.createToken({
      userId: user.id,
      token: Bearertoken
    })

    res.status(200).json({
      data:{
        token,
      },
      message:"you are logged in successfully!!"
    })


  } catch (error) {
    console.error("Failed to signup",error)
    next(error)
  }
}


