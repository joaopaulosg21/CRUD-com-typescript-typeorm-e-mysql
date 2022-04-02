import { User } from "../database/entity/User";
import { Request,Response } from "express";
import myDataSource from "../database/data-source";
import AuthController from "./authController";
import config from "../configs/config";
import { verify } from "jsonwebtoken";
import Post from "../database/entity/Post";

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
            res.status(201).json({msg:`${name} cadastrado com sucesso`});
        }catch(error){
            console.log(error);
            res.status(500).json({msg:error});
        }
    }

    async getUsers(req:Request,res:Response){
        try{
            const response = await myDataSource.manager.find(User);
            res.status(200).json(response);
        }catch(error){
            res.status(500).json({msg:error});
        }
    }

    async updateUser(req:Request,res:Response){
        const {name,username,password,email} = req.body;
        if(req.headers['authorization']){
            const secret = config.secret;
            if(secret){
                const token = req.headers['authorization'].replace('Bearer ','');
                const decoded:any = verify(token,secret);
                try{
                    const user = await myDataSource.manager.findOneBy(User,{id:decoded.id});
                    if(user){
                        user.name = name;
                        user.username = username;
                        user.password = password;
                        user.email = email;
                        await myDataSource.manager.save(user)
                        res.status(200).json({msg:`Seu user foi atualizado`});
                    }else{
                        res.status(500).json({msg:`User não existe}`});
                    }
                }catch(error){
                    res.status(500).json(error);
                }
            }
        }
    }
    
    async deleteUser(req:Request,res:Response){
        if(req.headers['authorization']){
            const secret = config.secret;
            if(secret){
                const token = req.headers['authorization'].replace('Bearer ','');
                const decoded:any = verify(token,secret);
                try{
                    const user = await myDataSource.manager.findOneBy(User,{id:decoded.id});
                    if(user){
                        const post = await myDataSource.manager.findAndCountBy(Post,{user:user})
                        if(post[1] > 0){
                            console.log(post)
                            res.status(401).json({msg:`Você não pode deletar seu user sem deletar seus posts`})
                            return
                        }
                        await myDataSource.manager.remove(user);
                        res.status(200).json({msg:`Seu user foi deletado`});
                    }else{
                        res.status(500).json({msg:`User não existe`});
                    }
                }catch(error){
                    res.status(500).json(error);
                }
            }
            
        }
    }

    async userLogin(req:Request,res:Response){
        const auth = new AuthController();
        const {username,password} = req.body;
        try{
            const response = await auth.login(username,password)
            res.status(200).json(response)
        }catch(error){
            res.status(500).json({msg:error});
        }
    }
}

export default UserController