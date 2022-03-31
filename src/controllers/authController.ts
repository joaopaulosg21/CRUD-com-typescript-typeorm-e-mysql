import { sign } from "jsonwebtoken";
import { User } from "../database/entity/User";
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
}

export default AuthController