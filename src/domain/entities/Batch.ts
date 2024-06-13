import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    Relation,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Bead } from './Bead';
import { Location } from './Location';

export enum FormatEnum {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

@Entity()
export class Batch extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true, enum: FormatEnum })
    format: FormatEnum;

    @OneToMany(() => Bead, (bead) => bead.batch)
    beads: Bead[];

    @Column()
    originId: number;
}
