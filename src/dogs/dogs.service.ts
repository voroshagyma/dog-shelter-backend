import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { faker } from "@faker-js/faker";

@Injectable()
export class DogsService {

  private dogs: Dog[];

  constructor() {
    this.initDogs();
  }

  create(createDogDto: CreateDogDto) {
    return 'This action adds a new dog';
  }

  findAll() {
    return new Promise(resolve => resolve(this.dogs));
  }

  findOne(id: number) {
    const dog = this.dogs.find(e => e.id === id);

    return new Promise((resolve, reject) => {
      resolve(dog);
    });
  }

  /**
   * Creates a list of fake dogs.
   */
  private initDogs() {
    const dogs: Dog[] = [];
    for (let i = 1; i <= 100; i++) {
      const dog: Dog = new Dog();
      dog.name = faker.name.firstName();
      dog.age = faker.datatype.number({ min: 0, max: 20 });
      dog.adoptedAt = i % 3 === 0 ? faker.date.between("2017-01-01", "2022-05-01") : null;
      dog.foundAt = faker.date.between("2017-01-01", "2022-05-01");
      dog.breed = faker.animal.dog();
      dog.id = i;

      dogs.push(dog);
    }
    this.dogs = dogs;
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return `This action updates a #${id} dog`;
  }

  remove(id: number) {
    const toRemoveId = this.dogs.find(e => e.id === id)?.id;

    if (toRemoveId !== undefined) {
      this.dogs = this.dogs.filter(e => e.id !== toRemoveId);
    }

    return new Promise((resolve, reject) => {
      resolve(toRemoveId);
    });
  }
}
