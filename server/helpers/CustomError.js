class CustomError extends Error {
    constructor(statusCode, message, errors){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
};

module.exports = CustomError;
module.exports.INVALID = new CustomError(401,"Invalid Credintials", "Wrong Email Or Password");
module.exports.INVALID_JWT = new CustomError(401,"Invalid Credintials", "Invalid Token");