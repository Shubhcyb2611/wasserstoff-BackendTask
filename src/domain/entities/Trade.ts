import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Trade extends BaseEntity {
    @Column({ nullable: true })
    gainedXp: number;

    @Column()
    supplierBeadId: number;

    @Column()
    receiverBeadId: number;

    @Column()
    supplierId: number;

    @Column()
    receiverId: number;
}
