import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;
    @Column()
    name: string;
    @Column()
    surname: string;
    @Column()
    password: string;
    @Column()
    role: 'admin' | 'user';
}
