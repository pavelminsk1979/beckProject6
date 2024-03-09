import {commentsRepository} from "../repositories/comments/comments-repository";


export const commentsSevrice = {

    async deleteComentById(id:string){
        return commentsRepository.deleteComentById(id)
    }
}