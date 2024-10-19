export const errorMiddleware = (err, req, res, next) => {
    if (err) {
        res.status(err.status).json({error: err.message});
    }else{
        next();
    }
};
