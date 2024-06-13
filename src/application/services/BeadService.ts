import { Bead } from '@/domain/entities';
import { AppDataSource, GenericRepository } from '@/infrastructure';
import { calculateDistance } from '@/interfaces/utils/calculate-distance';

export class BeadService {
    constructor(private beadRepository: GenericRepository<Bead>) {}

    async bulkCreateBead(beadData: Partial<Bead>[], batchId: number) {
        for (const bead of beadData) {
            bead.batch = batchId;
        }
        const response = await AppDataSource.createQueryBuilder()
            .insert()
            .into(Bead)
            .values(beadData)
            .execute();

        const beadIds = response.identifiers.map((bead) => bead.id);
        const beads = await AppDataSource.createQueryBuilder()
            .select()
            .from(Bead, 'bead')
            .where('id IN (:...beadIds)', { beadIds })
            .execute();

        return beads;
    }

    async getBeadById(beadId: number) {
        const bead = await this.beadRepository.findById(beadId, [
            'posts',
            'posts.location',
        ]);
        if (!bead) throw new Error('404::Bead not found');
        const locationHistory = [];
        bead.posts.map((post) => locationHistory.push(post.location));

        let totalDistance = 0.0;
        if (locationHistory.length > 1) {
            for (let i = 1; i < locationHistory.length; i++) {
                const prevLocation = locationHistory[i - 1];
                const currLocation = locationHistory[i];
                totalDistance += await calculateDistance(
                    {
                        lat: prevLocation.latitude,
                        lng: prevLocation.longitude,
                    },
                    {
                        lat: currLocation.latitude,
                        lng: currLocation.longitude,
                    }
                );
            }
        }

        const updatedBead = await this.beadRepository.findByIdAndUpdate(
            bead.id,
            //@ts-ignore
            {
                distanceTravelled:
                    locationHistory.length > 1 ? totalDistance : 0,
            }
        );

        return { ...updatedBead, locationHistory: locationHistory };
    }
    async getAllBeads(ownerId: number) {
        const beads = await this.beadRepository.findMany({ ownerId: ownerId });
        return beads;
    }

    async assignBeadToUser(userId: number, beadId: number, passCode: string) {
        const bead = await this.beadRepository.findById(beadId);
        if (bead.passCode != passCode)
            throw new Error('400::Invalid renewal Code');
        const updatedBead = await this.beadRepository.findByIdAndUpdate(
            bead.id,
            //@ts-ignore
            { ownerId: userId }
        );
        return updatedBead;
    }
}
