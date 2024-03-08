
export type CommentatorInfo={
    userId:string
    userLogin:string
}


export type Comment={
    content:string
    createdAt:string
    commentatorInfo:CommentatorInfo
}


export type OutputComment={
    id:string
    content:string
    createdAt:string
    commentatorInfo:CommentatorInfo
}
