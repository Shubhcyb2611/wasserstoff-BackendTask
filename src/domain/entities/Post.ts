import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    Relation,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Bead } from './Bead';
import { Location } from './Location';

@Entity()
export class Post extends BaseEntity {
    @Column('text', { array: true, nullable: true })
    content: string[]; //for videos or images

    @Column({ nullable: true })
    description: string;

    @OneToOne(() => Location)
    @JoinColumn()
    location: Location;

    @ManyToOne(() => Bead, (bead) => bead.posts, { cascade: true })
    bead: Relation<Bead>;

    @Column({ nullable: true })
    userId: number;
}
