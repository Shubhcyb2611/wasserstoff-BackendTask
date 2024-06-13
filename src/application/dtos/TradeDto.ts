import { IsNumber } from 'class-validator';

import { Expose } from 'class-transformer';

export class CreateTradeDTO {
    @IsNumber()
    gainedXp: number;

    @IsNumber()
    supplierBeadId: number;

    @IsNumber()
    receiverBeadId: number;

    @IsNumber()
    supplierId: number;

    @IsNumber()
    receiverId: number;
}

export class TradeDTO {
    @Expose()
    id: string;

    @Expose()
    gainedXp: number;

    @Expose()
    supplierBeadId: number;

    @Expose()
    receiverBeadId: number;

    @Expose()
    supplierId: number;

    @Expose()
    receiverId: number;
}
