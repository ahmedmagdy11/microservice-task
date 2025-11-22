import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateVmDto {
    @IsNotEmpty()
    hostname: string;

    @IsNotEmpty()
    password: string;

    @IsInt()
    @Min(1)
    cpuCores: number;

    @IsInt()
    @Min(1)
    memorySize: number;

    @IsInt()
    @Min(1)
    diskSize: number;

    @IsNotEmpty()
    os: string;
}
