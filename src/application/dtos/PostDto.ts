import { IsNumber, IsString, ValidateNested } from 'class-validator';

import { Expose, Type } from 'class-transformer';
import { LocationDTO } from './LocationDto';

export class CreatePostDTO {
    @IsString()
    image: string;

    @IsString()
    description: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;
}

export class PostDTO {
    // @Expose()
    // id: number;

    // @Expose()
    // image: string;

    @Expose()
    description: string;

    @Expose()
    @ValidateNested()
    @Type(() => LocationDTO)
    location: LocationDTO;

    @Expose()
    bead: number;

    @Expose()
    userId: number;
}
