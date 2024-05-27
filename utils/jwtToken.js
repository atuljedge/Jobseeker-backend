
export const sendToken=(user,statusCode,res,message)=>{
    const token= user.getJWTtoken();
    // console.log(token)
    const options = {
      expiresIn: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, // Set httpOnly to true
      secure:false,
      sameSite:"Strict"
    };
  res.status(statusCode).cookie("token",token,options).json({
    success:true,
    user,
    message,
    token,
    
  });
};











