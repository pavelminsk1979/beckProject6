import {Comment} from "../../allTypes/commentTypes";
import {commentsCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {ResultCode} from "../../common/object-result";

export const commentsRepository = {

    async createComment(newComment: Comment) {

        const result = await commentsCollection.insertOne(newComment)

        return result
    },

    async deleteComentById(id:string){

        const result = await commentsCollection.deleteOne({_id:new ObjectId(id)})

        const res = !!result.deletedCount

        if(res){
            return {code:ResultCode.Success}
        } else {
            return {code:ResultCode.NotFound}
        }

    }

}