import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Post } from './Post';
import { Batch } from './Batch';

@Entity()
export class Bead extends BaseEntity {
    @Column({ nullable: true })
    nickName: string;

    @Column('text', { nullable: true, array: true })
    colors: string[];

    @Column('float', { nullable: true })
    distanceTravelled: number;

    @Column({ nullable: true })
    renewalCode: string;

    @Column({ nullable: true })
    passCode: string;

    @Column({ nullable: true })
    ownerId: number;

    @Column({ nullable: true })
    currentOwner: number;

    @Column({ nullable: true, default: false })
    isPublic?: boolean;

    @OneToMany(() => Post, (post) => post.bead)
    posts: Post[];

    @ManyToOne(() => Batch, (batch) => batch.beads)
    batch: Batch | number;
}
