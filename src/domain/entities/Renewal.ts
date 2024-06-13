import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Renewal extends BaseEntity {
    @Column()
    name: string;

    @Column()
    beadId: number;

    @Column()
    description: string;
}
