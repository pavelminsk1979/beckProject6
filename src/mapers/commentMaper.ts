import {WithId} from "mongodb";
import {OutputComment} from "../allTypes/commentTypes";




export const commentMaper = (comment:any):OutputComment => {
    return {
        id:comment._id.toString(),
        content: comment.content,
        createdAt: comment.createdAt,
        commentatorInfo:comment.commentatorInfo
    }
}