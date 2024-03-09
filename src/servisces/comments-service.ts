import {commentsRepository} from "../repositories/comments/comments-repository";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";
import {ResultCode} from "../common/object-result";


export const commentsSevrice = {

    async deleteComentById(idComent:string,userId:string){

const comment = await commentsQueryRepository.findCommentById(idComent)
        if(comment && userId===comment.commentatorInfo.userId) {
            return commentsRepository.deleteComentById(idComent)
        } else {
            return {code:ResultCode.Failure}
        }


    }
}