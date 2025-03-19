import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ nullable: false })
  public accountExternalIdDebit: string;

  @Column({ nullable: false })
  public accountExternalIdCredit: string;

  @Column({ type: 'int', nullable: false })
  public transferTypeId: number;

  @Column({ type: 'decimal', nullable: false })
  public value: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  public status: TransactionStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public readonly createdAt: Date;
}
