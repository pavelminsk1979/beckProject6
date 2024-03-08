import {commentsCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {commentMaper} from "../../mapers/commentMaper";

export const commentsQueryRepository = {

    async findCommentById(id: string) {

        const comment = await commentsCollection.findOne({_id: new ObjectId(id)})

        if(!comment) return null

        return commentMaper(comment)
       

    }
}