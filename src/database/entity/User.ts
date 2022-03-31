import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

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
}