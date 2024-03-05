
import jwt from "jsonwebtoken"
import {settings} from "../common/settings";


export const tokenJwtServise={

    async createTokenJwt(userId:string):Promise<string>{

        const token = await jwt.sign({userId:userId}, settings.JWT_SECRET,{expiresIn:settings.TIME_LIFE_TOKEN})

        return token
    },

    async getUserIdByToken(token:string){
        try {
            const result = await jwt.verify(token,settings.JWT_SECRET)
            return  result
        }catch (error) {
            console.log('token-jwt-service.ts' + error)
          return null
        }
    }
}