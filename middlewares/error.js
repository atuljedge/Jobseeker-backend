class Errorhandler extends Error{
    constructor(message, statusCode)
    {
        super(message);
        this.statusCode=statusCode;
    }
}
const errorMiddleware=(err,req,res,next)=>{

    err.message=err.message|| "internal server error ";
    err.statusCode= err.statusCode || 500;
    
    if(err.name==="CaseError"){
        const message=`resource not found. invalid ${err.path}`;
        err=new Errorhandler(message,400);
    }
    if(err.code===11000){
        const message=`duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new Errorhandler(message,400);
    }
    if(err.name==="JasonwebTokenError"){
        const message=`JsonwebToken is invalid try again`;
        err=new Errorhandler(message,400);
    }
    if(err.name==="TokenExpireError"){
        const message=`Jsonweb token is expired try again...`;
        err=new Errorhandler(message,400);
    }
   return res.status(statusCode).json({
    success:false,
    message:err.message,
});
};

export default Errorhandler;