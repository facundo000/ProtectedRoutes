import { ValidRoles } from "src/auth/interface/valid-roles";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true })
    username: string;
    @Column()
    name: string;
    @Column()
    surname: string;
    @Column()
    password: string;
    @Column({
        type: 'enum',
        enum: ValidRoles,
        default: ValidRoles.USER
    })
    role: ValidRoles;
    // @Column()
    // isActive: boolean
}
