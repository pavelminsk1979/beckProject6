import {Comment} from "../../allTypes/commentTypes";
import {commentsCollection} from "../../db/mongoDb";

export const commentsRepository = {

    async createComment(newComment: Comment) {

        const result = await commentsCollection.insertOne(newComment)

        return result
    }
}