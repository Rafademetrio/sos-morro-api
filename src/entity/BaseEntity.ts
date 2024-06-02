import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';


export abstract class BaseEntity {
   
    @PrimaryGeneratedColumn("uuid")
    uid: string

    @Column({default: true})
    active: boolean;

    @Column({default: false})
    deleted: boolean;

    @CreateDateColumn({type: "timestamp"})
    createAt: Date;

    @CreateDateColumn({type: "timestamp"})
    updateAt: Date;

}