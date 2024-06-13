import { Bead, Trade, User } from '@/domain/entities';
import { GenericRepository } from '@/infrastructure';

export class TradeService {
    constructor(
        private userRepository: GenericRepository<User>,
        private beadRepository: GenericRepository<Bead>,
        private tradeRepository: GenericRepository<Trade>
    ) {}

    async createTrade(tradeData: {
        supplierBeadId: number;
        receiverBeadId: number;
        supplierId: number;
        receiverId: number;
        gainedXp: number;
    }) {
        const {
            supplierBeadId,
            receiverBeadId,
            supplierId,
            receiverId,
            gainedXp,
        } = tradeData;
        const supplier = await this.userRepository.findById(supplierId);
        const receiver = await this.userRepository.findById(receiverId);
        if (!supplier || !receiver) throw new Error('404::User not found');

        const supplierBead = await this.beadRepository.findById(supplierBeadId);
        const receiverBead = await this.beadRepository.findById(receiverBeadId);

        if (!(supplierBead || receiverBead))
            throw new Error('404::Bead not found');

        await this.beadRepository.findByIdAndUpdate(
            supplierBeadId,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            { currentOwner: receiverId }
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        await this.beadRepository.findByIdAndUpdate(receiverBeadId, {
            currentOwner: supplierId,
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        await this.userRepository.findByIdAndUpdate(supplierId, {
            experiencePoints: supplier.experiencePoints + gainedXp,
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        await this.userRepository.findByIdAndUpdate(receiverId, {
            experiencePoints: receiver.experiencePoints + gainedXp,
        });

        const supplierOwner = await this.userRepository.findById(
            supplierBead.ownerId
        );
        const receiverOwner = await this.userRepository.findById(
            receiverBead.ownerId
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        await this.userRepository.findByIdAndUpdate(supplierOwner.id, {
            experiencePoints: supplierOwner.experiencePoints + gainedXp * 0.1,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        await this.userRepository.findByIdAndUpdate(receiverOwner.id, {
            experiencePoints: receiverOwner.experiencePoints + gainedXp * 0.1,
        });

        const trade = await this.tradeRepository.create(tradeData);
        return trade;
    }
    q;
    async getTrade(tradeId: number) {
        const trade = await this.tradeRepository.findById(tradeId);
        return trade;
    }
}
