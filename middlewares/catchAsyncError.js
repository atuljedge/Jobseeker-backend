import promises from 'promise';

export const catchAsyncError=(theFunction)=>{
    return (req,res,next)=>{
        promises.resolve(theFunction(req,res,next)).catch(next);

    };
};




