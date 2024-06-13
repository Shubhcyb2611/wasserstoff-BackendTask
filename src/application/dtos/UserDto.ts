import { IsEmail, IsStrongPassword } from 'class-validator';

import { Exclude, Expose } from 'class-transformer';

export class CreateUserDTO {
    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    password: string;
}

export class UserDTO {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    displayName: string;

    @Expose()
    experiencePoints: number;

    @Expose()
    profilePic: string;

    @Expose()
    bio: string;

    @Expose()
    email: string;

    @Expose()
    phoneNumber: string;

    @Exclude()
    password!: string;
}
