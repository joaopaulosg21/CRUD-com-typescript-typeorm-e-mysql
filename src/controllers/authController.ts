import { sign,verify } from "jsonwebtoken";
import { User } from "../database/entity/User";
import { Request,Response,NextFunction } from "express";
import myDataSource from "../database/data-source";
import config from "../configs/config";

class AuthController{

    async login(username:string,password:string):Promise<object|undefined>{
        if(username && password !== null){
            const user = await myDataSource.manager.findOneBy(User,{username:username,password:password});
            if(user !== null){
                const secret = config.secret;
                if(secret){
                    const token = sign({'id':user.id},secret)
                    return {token:token}
                }
            }else{
                return {msg:`User não cadastrado`}
            }
        }else{
            return {msg:`Nenhum campo pode estar vazio`}
        }
    }

    async verifyToken(req:Request,res:Response,next:NextFunction){
        if(req.headers['authorization']){
            const token = req.headers['authorization']?.replace('Bearer ','')
            const secret = config.secret;
            if(secret && token){
                const decoded = verify(token,secret);
                if(decoded){
                    next()
                }else{
                   res.status(401).json({msg:`Token invalido`})
                }
            }else{
                res.status(401).json({msg:`Token invalido`})
            }
        }else{
            return res.status(401).json({msg:`Você não está logado`})
        }
        
    }
}

export default AuthController