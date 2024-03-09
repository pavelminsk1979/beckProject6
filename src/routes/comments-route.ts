import {Response, Router} from "express";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";
import {RequestWithParams} from "../allTypes/RequestWithParams";
import {STATUS_CODE} from "../common/constant-status-code";
import {IdCommentParam} from "../models/IdCommentParam";
import {authTokenMiddleware} from "../middlewares/authMiddleware/authTokenMiddleware";
import {commentsSevrice} from "../servisces/comments-service";
import {postIdMiddleware} from "../middlewares/postsMiddlewares/postIdMiddleware";
import {commentIdMiddleware} from "../middlewares/commentsMiddleware/commentIdMiddleware";
import {ResultCode} from "../common/object-result";


export const commentsRoute = Router({})


commentsRoute.get('/:commentId', commentIdMiddleware, async (req: RequestWithParams<IdCommentParam>, res: Response) => {

    try {
        const comment = await commentsQueryRepository.findCommentById(req.params.commentId)

        if (comment) {
            return res.status(STATUS_CODE.SUCCESS_200).send(comment)
        } else {
            return res.sendStatus(STATUS_CODE.NOT_FOUND_404)
        }

    } catch (error) {
        console.log(' FIlE comments-routes.ts get-/:commentId' + error)
        return res.sendStatus(STATUS_CODE.SERVER_ERROR_500)
    }

})


commentsRoute.delete('/:commentId', commentIdMiddleware, authTokenMiddleware, async (req: RequestWithParams<IdCommentParam>, res: Response) => {

    try {

        const isCommentDelete = await commentsSevrice.deleteComentById(req.params.commentId, req.userIdLoginEmail.id)

        if (isCommentDelete.code === ResultCode.Success) {
            return res.sendStatus(STATUS_CODE.NO_CONTENT_204)
        }
        if (isCommentDelete.code === ResultCode.NotFound) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND_404)
        }
        if (isCommentDelete.code === ResultCode.Failure) {
            return res.sendStatus(STATUS_CODE.FORBIDDEN_403)
        } else {
            return res.sendStatus(STATUS_CODE.NOT_FOUND_404)
        }

    } catch (error) {
        console.log(' FIlE comments-routes.ts delete-/:commentId' + error)
        return res.sendStatus(STATUS_CODE.SERVER_ERROR_500)
    }

})