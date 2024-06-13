import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import bcrypt from 'bcryptjs';
import { BaseEntity } from './BaseEntity';

export enum UserType {
    Admin = 'admin',
    Customer = 'customer',
}

@Entity()
export class User extends BaseEntity {
    @Column({ nullable: true, unique: true })
    name: string;

    @Column({ nullable: true })
    displayName: string;

    @Column({ nullable: true })
    profilePic: string;

    @Column({ nullable: true })
    bio: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    experiencePoints: number;

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword() {
        if (this.password) {
            const hashedPassword = await bcrypt.hash(this.password, 12);
            this.password = hashedPassword;
        }
    }

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ type: 'enum', enum: UserType, default: UserType.Customer })
    _userType: UserType;
}
