import {Entity,PrimaryGeneratedColumn,Column,OneToMany, CreateDateColumn, ManyToOne} from 'typeorm';
import { User } from './User';

@Entity('posts')
class Post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column('text')
    text:string

    @CreateDateColumn()
    date:Date

    @ManyToOne(()=>User,(user)=>user.posts)
    user:User
}

export default Post