import { User } from "../database/entity/User";
import { Request,Response } from "express";
import myDataSource from "../database/data-source";

class UserController{
    async newUser(req:Request,res:Response){
        const {name,username,password,email} = req.body;
        try{
            await myDataSource.manager.insert(User,{
                name:name,
                username:username,
                password:password,
                email:email
            });
            res.status(201).json(`${name} cadastrado com sucesso`)
        }catch(error){
            console.log(error)
            res.status(500).json(`${error}`)
        }
        
    }
}

export default UserController