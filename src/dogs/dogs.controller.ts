import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guaard';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) { }

  private throw404OrReturnValue(value: any) {

    if (value === undefined) {
      throw new NotFoundException();
    }

    return value;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @Get()
  findAll() {
    return this.dogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    const dog = await this.dogsService.findOne(+id);

    return this.throw404OrReturnValue(dog);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    const updatedDog = await this.dogsService.update(+id, updateDogDto);

    return this.throw404OrReturnValue(updatedDog);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedId = await this.dogsService.remove(+id);

    return this.throw404OrReturnValue(removedId);
  }
}
