import {Response, Router} from "express";
import {RequestWithBody} from "../allTypes/RequestWithBody";
import {errorValidationBlogs} from "../middlewares/blogsMiddelwares/errorValidationBlogs";
import {STATUS_CODE} from "../constant-status-code";
import {loginAndEmailValidationAuth} from "../middlewares/authMiddleware/loginAndEmailValidationAuth";
import {passwordValidationAuth} from "../middlewares/authMiddleware/passwordValidationAuth";
import {AuthModel} from "../allTypes/authTypes";
import {authService} from "../servisces/auth-service";



export const authRoute = Router({})

const postValidationAuth = () => [loginAndEmailValidationAuth, passwordValidationAuth]


authRoute.post('/login', postValidationAuth(), errorValidationBlogs, async (req: RequestWithBody<AuthModel>, res: Response)=> {
debugger
    const isExistUser = await authService.findUserInDataBase(req.body)

    if (isExistUser) {
        return res.sendStatus(STATUS_CODE.NO_CONTENT_204)

    } else {
       return  res.sendStatus(STATUS_CODE.UNAUTHORIZED_401)
    }

})







