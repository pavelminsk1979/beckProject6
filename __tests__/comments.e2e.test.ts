import {agent as supertest} from "supertest";
import {app} from "../src/settings";
import {STATUS_CODE} from "../src/common/constant-status-code";


const  req = supertest(app)

describe('/comments',()=>{

    let idNewBlog:string

    const loginPasswordBasic64='YWRtaW46cXdlcnR5'


    beforeAll(async ()=>{
        await req
            .delete ('/testing/all-data')

        const createRes =await req
            .post('/blogs')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ name: 'nameBlog',
                description: 'descriptionBlog',
                websiteUrl:'https://www.outue.Blog/'})
            .expect(STATUS_CODE.CREATED_201)
        idNewBlog=createRes.body.id
        //console.log(idNewBlog)
    })




    const loginNewUser ='300300'
    const passwordNewUser ='11111pasw'
    const emailNewUser ='palPel@mail.ru'

    it('POST create newUsers',async ()=>{
        const res =await req
            .post('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ login: loginNewUser,
                password: passwordNewUser,
                email:emailNewUser})
            .expect(STATUS_CODE.CREATED_201)

        expect(res.body.login).toEqual(loginNewUser)
        expect(res.body.email).toEqual(emailNewUser)
    })


let jwtToken=''
    it("input correct login and password and sign in (ok)",async ()=>{
        const res =await req
            .post('/auth/login')
            .send({ loginOrEmail: loginNewUser,
                password: passwordNewUser})
            .expect(STATUS_CODE.SUCCESS_200)

            // console.log(res.body.accessToken)
        jwtToken=res.body.accessToken

        expect(res.body.accessToken).toBeTruthy()
    })



    it("me  request  (ok)",async ()=>{
        const res =await req
            .get('/auth/me')
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(STATUS_CODE.SUCCESS_200)

    })


    let idNewPost:string

    it('POST create newPost',async ()=>{
        const res =await req
            .post('/posts')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ title: 'title',
                shortDescription: 'shortDescription',
                content:'content',
                blogId:idNewBlog})
            .expect(STATUS_CODE.CREATED_201)

        idNewPost=res.body.id

        expect(res.body.title).toEqual('title')
        expect(res.body.shortDescription).toEqual('shortDescription')
        expect(res.body.content).toEqual('content')
    })


    it("POST create newComment for exist  post",async ()=>{
        const res =await req
            .post(`/posts/${idNewPost}/comments`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({content:'content for comments for post'})
            .expect(STATUS_CODE.CREATED_201)
        console.log(res.body)

    })

})