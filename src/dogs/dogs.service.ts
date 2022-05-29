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
    const newDog: Dog = new Dog();
    newDog.adoptedAt = createDogDto.adoptedAt;
    newDog.age = createDogDto.age;
    newDog.breed = createDogDto.breed;
    newDog.foundAt = createDogDto.foundAt;
    newDog.name = createDogDto.name;
    newDog.id = Math.max(...this.dogs.map(e => e.id)) + 1;

    this.dogs.push(newDog);

    return new Promise(resolve => resolve(newDog));
  }

  findAll() {
    return new Promise(resolve => resolve(this.dogs));
  }

  findOne(id: number) {
    const dog = this.dogs.find(e => e.id === id);

    return new Promise(resolve => resolve(dog));
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

    const dogToUpdate = this.dogs.find(e => e.id === id);

    if (dogToUpdate) {
      dogToUpdate.adoptedAt = updateDogDto.adoptedAt;
      dogToUpdate.age = updateDogDto.age;
      dogToUpdate.breed = updateDogDto.breed;
      dogToUpdate.foundAt = updateDogDto.foundAt;
      dogToUpdate.name = updateDogDto.name;
    }

    return new Promise(resolve => resolve(dogToUpdate));

  }

  remove(id: number) {
    const toRemoveId = this.dogs.find(e => e.id === id)?.id;

    if (toRemoveId !== undefined) {
      this.dogs = this.dogs.filter(e => e.id !== toRemoveId);
    }

    return new Promise(resolve => resolve(toRemoveId));
  }
}
