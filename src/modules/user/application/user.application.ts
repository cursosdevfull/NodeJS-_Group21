import { UserPort } from "./ports/user.port";
import { User, UserUpdateProps } from "./user";
import { NotFoundException } from '../../../core/exceptions/handles';

export class UserApplication {
    constructor(private readonly port: UserPort) { }

    async create(user: User) {
        return this.port.save(user);
    }

    async findById(id: number) {
        return this.port.findById(id);
    }

    async findAll() {
        return this.port.findAll();
    }

    async update(userId: number, props: UserUpdateProps) {
        const user = await this.port.findById(userId);
        if (user) {
            user.update(props);
            return this.port.save(user);
        }
        throw new NotFoundException(`User with id ${userId} not found`);
    }

    async delete(userId: number) {
        const user = await this.port.findById(userId);
        if (user) {
            user.delete();
            return this.port.save(user);
        }
        throw new NotFoundException(`User with id ${userId} not found`);
    }

    async getByPage(page: number, limit: number) {
        return this.port.getByPage(page, limit);
    }

}