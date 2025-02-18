import {AppError} from "../error"

export class MovieNotFound extends AppError {
    constructor(){
        super("Movie not found",404)
        Error.captureStackTrace(this)
    }
}

export class InvalidNotePayload extends AppError{
    constructor(meta?:any){
        super("Invalid Payload",404,meta)
        Error.captureStackTrace(this)
    }
}

export class ReviewNotFound extends AppError{
    constructor(){
        super("Review Not Found", 404)
    }
}

export class UnAuthorized extends AppError{
    constructor(){
        super("You are not authorized", 403)
    }
}

