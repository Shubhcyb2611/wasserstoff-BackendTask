import { IsString, ValidateNested } from 'class-validator';

import { Expose, Type } from 'class-transformer';
import { LocationDTO } from './LocationDto';
import { Post } from '@/domain/entities';
import { PostDTO } from './PostDto';

export class CreateBeadDTO {
    @IsString()
    nickName: string;

    @IsString()
    passCode: string;
}

export class BeadDTO {
    @Expose()
    id: string;

    @Expose()
    nickName: string;

    @Expose()
    renewalCode: string;

    @Expose()
    passCode: string;

    @Expose()
    distanceTravelled: number;

    @Expose()
    currentOwner: number;

    @Expose()
    ownerId: number;

    @Expose()
    @ValidateNested()
    @Type(() => PostDTO)
    posts: PostDTO;

    @Expose()
    locationHistory: LocationDTO;
}
