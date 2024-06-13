import { IsNumber } from 'class-validator';

export class LocationDTO {
    @IsNumber()
    latitude: string;

    @IsNumber()
    longitude: string;
}
