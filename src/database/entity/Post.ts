import {Entity,PrimaryGeneratedColumn,Column,OneToMany, CreateDateColumn, ManyToOne} from 'typeorm';
import { User } from './User';

@Entity('posts')
class Post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable: false})
    title:string;

    @Column('text',{nullable: false})
    text:string

    @CreateDateColumn()
    date:Date

    @ManyToOne(()=>User,(user)=>user.posts)
    user:User
}

export default Post