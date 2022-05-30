
import { Injectable } from '@nestjs/common';
import User from './models/user';


@Injectable()
export class UsersService {

    private readonly users = [
        {
            id: 1,
            username: 'john',
            password: 'changeme',
        }
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
