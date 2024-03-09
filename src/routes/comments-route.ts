import {Response, Router} from "express";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";
import {RequestWithParams} from "../allTypes/RequestWithParams";
import {STATUS_CODE} from "../common/constant-status-code";
import {IdCommentParam} from "../models/IdCommentParam";
import {authTokenMiddleware} from "../middlewares/authMiddleware/authTokenMiddleware";
import {commentsSevrice} from "../servisces/comments-service";



export const commentsRoute=Router({})




commentsRoute.get('/:commentId',async (req: RequestWithParams<IdCommentParam>, res: Response)=>{

    try {
        const comment = await commentsQueryRepository.findCommentById(req.params.commentId)

        if(comment){
             res.status(STATUS_CODE.SUCCESS_200).send(comment)
        } else {
            res.sendStatus(STATUS_CODE.NOT_FOUND_404)
        }

    }catch (error) {
       console.log(' FIlE comments-routes.ts get-/:commentId' + error)
   }

})




commentsRoute.delete('/:commentId',authTokenMiddleware,async (req: RequestWithParams<IdCommentParam>, res: Response)=>{

    try {

        const isCommentDelete = await commentsSevrice.deleteComentById(req.params.commentId)

        if(isCommentDelete){
            res.sendStatus(STATUS_CODE.NO_CONTENT_204)
        } else {
            res.sendStatus(STATUS_CODE.NOT_FOUND_404)
        }

    }catch (error) {
        console.log(' FIlE comments-routes.ts delete-/:commentId' + error)
    }

})