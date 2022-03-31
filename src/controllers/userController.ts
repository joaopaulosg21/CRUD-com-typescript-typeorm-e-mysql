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
            res.status(201).json(`${name} cadastrado com sucesso`);
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }

    async getUsers(req:Request,res:Response){
        try{
            const response = await myDataSource.manager.find(User);
            res.status(200).json(response);
        }catch(error){
            res.status(500).json(error);
        }
    }

    async updateUser(req:Request,res:Response){
        const id = parseInt(req.params.id);
        const {name,username,password,email} = req.body;
        try{
            const user = await myDataSource.manager.findOneBy(User,{id:id});
            if(user){
                user.name = name;
                user.username = username;
                user.password = password;
                user.email = email;
                await myDataSource.manager.save(user)
                res.status(200).json(`User atualizado`);
            }else{
                res.status(500).json(`User não existe`);
            }
        }catch(error){
            res.status(500).json(error);
        }
    }
    
    async deleteUser(req:Request,res:Response){
        const id = parseInt(req.params.id);
        try{
            const user = await myDataSource.manager.findOneBy(User,{id:id});
            if(user){
                await myDataSource.manager.remove(user)
                res.status(200).json(`User deletado`);
            }else{
                res.status(500).json(`User não existe`);
            }
        }catch(error){
            res.status(500).json(error);
        }
    }
}

export default UserController