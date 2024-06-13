import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Location extends BaseEntity {
    @Column('float')
    latitude: number;

    @Column('float')
    longitude: number;
}
