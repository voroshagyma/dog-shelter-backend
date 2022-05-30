import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { faker } from "@faker-js/faker";
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DogsService {

  private dogs: Dog[];

  constructor(private httpService: HttpService) {
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
    newDog.description = createDogDto.description;

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

    this.httpService.get<{ message: string[] }>('https://dog.ceo/api/breeds/image/random/100').subscribe(e => {

      const pics = e.data.message;

      for (let i = 1; i <= 100; i++) {
        const dog: Dog = new Dog();
        dog.name = faker.name.firstName();
        dog.age = faker.datatype.number({ min: 0, max: 20 });
        dog.foundAt = faker.date.between("2017-01-01", "2022-05-01");
        dog.adoptedAt = i % 3 === 0 ? faker.date.future(0.5, dog.foundAt) : null;
        dog.breed = faker.animal.dog();
        dog.id = i;
        dog.description = faker.lorem.sentences(4);
        dog.picture = pics[i];

        dogs.push(dog);
      }
      this.dogs = dogs;
    })

  }

  update(id: number, updateDogDto: UpdateDogDto) {

    let dogToUpdate = this.dogs.find(e => e.id === id);

    if (dogToUpdate) {
      dogToUpdate = { ...dogToUpdate, ...updateDogDto };
      this.dogs[this.dogs.findIndex(e => e.id === id)] = dogToUpdate;
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
