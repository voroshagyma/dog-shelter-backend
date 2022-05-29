import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateDogDto {

    @IsOptional()
    @IsDate()
    adoptedAt: Date;

    @IsInt()
    age: number;

    @IsString()
    breed: string;

    @IsDate()
    foundAt: Date;

    @IsString()
    name: string;
}
