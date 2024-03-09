import {Comment} from "../../allTypes/commentTypes";
import {commentsCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";

export const commentsRepository = {

    async createComment(newComment: Comment) {

        const result = await commentsCollection.insertOne(newComment)

        return result
    },

    async deleteComentById(id:string){
        debugger
        const result = await commentsCollection.deleteOne({_id:new ObjectId(id)})

        return !!result.deletedCount
    }

}