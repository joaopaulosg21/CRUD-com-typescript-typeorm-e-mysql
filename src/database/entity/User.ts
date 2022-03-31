import { Entity,PrimaryGeneratedColumn,Column,ManyToOne, OneToMany } from "typeorm";
import Post from "./Post";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column({ nullable: false})
    name:string

    @Column({ nullable: false})
    username:string

    @Column({ nullable: false})
    password:string

    @Column({ nullable: false})
    email:string

    @OneToMany(()=>Post,(post)=> post.user)
    posts:Post
}