import {Response, Router} from "express";
import {RequestWithBody} from "../allTypes/RequestWithBody";
import {errorValidationBlogs} from "../middlewares/blogsMiddelwares/errorValidationBlogs";
import {STATUS_CODE} from "../constant-status-code";
import {loginAndEmailValidationAuth} from "../middlewares/authMiddleware/loginAndEmailValidationAuth";
import {passwordValidationAuth} from "../middlewares/authMiddleware/passwordValidationAuth";
import {AuthModel} from "../allTypes/authTypes";
import {authService} from "../servisces/auth-service";
import {tokenJwtServise} from "../servisces/token-jwt-service";


export const authRoute = Router({})

const postValidationAuth = () => [loginAndEmailValidationAuth, passwordValidationAuth]


authRoute.post('/login', postValidationAuth(), errorValidationBlogs, async (req: RequestWithBody<AuthModel>, res: Response) => {
    try {

        const idUser = await authService.findUserInDataBase(req.body)

        if (idUser) {

            const token = await tokenJwtServise.createTokenJwt(idUser)
            const answer = {"accessToken": token}

            res.status(STATUS_CODE.SUCCESS_200).send(answer)

        } else {
            res.sendStatus(STATUS_CODE.UNAUTHORIZED_401)
        }

    } catch (error) {
        console.log('auth-routes.ts /login' + error)
    }
})


/*authRoute.get('/me',async (req: Response, res: Response) => {
const result = await tokenJwtServise.getUserIdByToken(req)
})*/




