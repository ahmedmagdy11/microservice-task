import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('vms')
export class Vm {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

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
    status: string; // creating | running | failed

    @Column({ nullable: true })
    externalId: string;

    @Column({ nullable: true })
    errorMessage: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
