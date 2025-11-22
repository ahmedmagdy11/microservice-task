import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('vms')
export class Vm {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column({
        type: 'varchar',  nullable: true, unique: true })
        idempotencyKey: string | null;


    @Column()
    hostname: string;

    @Column()
    password: string;

    @Column()
    cpuCores: number;

    @Column()
    memorySize: number;

    @Column()
    diskSize: number;

    @Column()
    os: string;

    @Column({ default: 'creating' })
    status: string; 

    @Column({ nullable: true })
    externalId: string;

    @Column({ nullable: true })
    errorMessage: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
