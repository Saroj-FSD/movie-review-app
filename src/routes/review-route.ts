import {Express} from "express"
import {CreateReviewController} from "../controller/review-controller/create-review-controller"
import {GetByIdReviewController} from "../controller/review-controller/get-by-id-review-controller"
import {GetAllReviewController} from "../controller/review-controller/get-all-review-controller"
import {UpdateReviewController} from "../controller/review-controller/update-review-controller"
import {DeleteReviewController} from "../controller/review-controller/delete-review-controller"
import { authMiddleware } from "../utils/auth-middleware"

export function CreateReviewRoutes(app:Express){
    app.post("/reviews/create", authMiddleware, CreateReviewController)
    app.get("/reviews/:reviewId",GetByIdReviewController)
    app.get("/reviews", GetAllReviewController)
    app.put("/reviews/update/:reviewId",authMiddleware, UpdateReviewController)
    app.delete("/reviews/delete/:reviewId", DeleteReviewController)
}