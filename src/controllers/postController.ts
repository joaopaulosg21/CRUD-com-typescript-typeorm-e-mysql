
import Post from "../database/entity/Post";
import myDataSource from "../database/data-source";
import { User } from "../database/entity/User";
import config from "../configs/config";
import { verify } from "jsonwebtoken";
import { Request,Response } from "express";

class PostController{

    async newPost(req:Request,res:Response){
        const {title,text} = req.body;
        if(req.headers['authorization']){
            const secret = config.secret;
            const token = req.headers['authorization'].replace('Bearer ','');
            if(secret){
                const decoded:any = verify(token,secret);
                try{
                    const user = await myDataSource.manager.findOneBy(User,{id:decoded.id});
                    const post = new Post()
                    post.title = title;
                    post.text = text;
                    if(user){
                        post.user = user;
                    }
                    await myDataSource.manager.save(post)
                    res.status(201).json({msg:`${post.title} cadastrado com sucesso`});
                }catch(error){
                    res.status(500).json(error);
                }
            }
            
        }
    }

    async getPosts(req:Request,res:Response){
        try{
            const posts = await myDataSource.manager.find(Post);
            res.status(200).json(posts);
        }catch(error){
            res.status(500).json({msg:error});
        }
    }

    async updatePost(req:Request,res:Response){
        const {text} = req.body;
        const id:number = parseInt(req.params.id);
        if(req.headers['authorization']){
            const secret = config.secret;
            const token:string = req.headers['authorization'].replace('Bearer ','');
            if(secret){
                const decoded:any = verify(token,secret);
                const user = await myDataSource.manager.findOneBy(User,{id:decoded.id});
                if(user){
                    const post = await myDataSource.manager.findOneBy(Post,{id:id,user:user});
                    if(post){
                        post.text = text;
                        await myDataSource.manager.save(post);
                        res.status(200).json({msg:`Post atualizado`});
                    }else{
                        res.status(401).json({msg:`Você não pode editar esse post`});
                    }
                }else{
                    res.status(401).json({msg:`Você não está logado`});
                }
            }
            
        }
    }

    async deletePost(req:Request,res:Response){
        const id:number = parseInt(req.params.id);
        if(req.headers['authorization']){
            const secret = config.secret;
            const token:string = req.headers['authorization'].replace('Bearer ','');
            if(secret){
                const decoded:any = verify(token,secret);
                const user = await myDataSource.manager.findOneBy(User,{id:decoded.id});
                if(user){
                    const post = await myDataSource.manager.findOneBy(Post,{id:id,user:user});
                    if(post){
                        await myDataSource.manager.remove(post);
                        res.status(200).json({msg:`Post deletado`});
                    }else{
                        res.status(401).json({msg:`Você não pode deletar esse post ou post não existe`});
                    }
                }
            }
        }
    }
}

export default PostController