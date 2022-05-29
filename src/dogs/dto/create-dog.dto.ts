import { IsString, IsInt, IsOptional, IsISO8601 } from 'class-validator';

export class CreateDogDto {

    @IsOptional()
    @IsISO8601()
    adoptedAt: Date;

    @IsInt()
    age: number;

    @IsString()
    breed: string;

    @IsISO8601()
    foundAt: Date;

    @IsString()
    name: string;
}
