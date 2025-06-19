import { UserPort } from "../application/ports/user.port";
import { User } from "../application/user";
import { UserModel } from "./models";
import { UserDto } from "./dtos";
import { DatabaseBootstrap } from '../../../bootstrap/database.bootstrap';
import { IsNull } from "typeorm";
import { DatabaseException, NotFoundException } from '../../../core/exceptions/handles';
import { ResultPage } from '../../../core/types/result-page';


export class UserAdapter implements UserPort {
    async save(user: User): Promise<User> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserModel)
            const model = UserDto.fromDomainToData(user) as UserModel;
            const result = await repository.save(model);
            const userSaved = await repository.findOne({ where: { userId: result.userId }, relations: ['roles'] });

            return UserDto.fromDataToDomain(userSaved!) as User;
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error.errors.map((err: any) => err.message).join(', ');
                const errorStack = error.errors.map((err: any) => err.stack).join(', ');
                throw new DatabaseException(`Database error: ${errorMessage}`, errorStack);
            } else {
                throw new DatabaseException(error.message, error.stack)
            }
        }
    }

    async findById(userId: number): Promise<User> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserModel)
            const userMatched = await repository.findOne({
                where: { userId, deletedAt: IsNull() },
                relations: ['roles']
            });

            if (!userMatched) {
                throw new NotFoundException(`User with id ${userId} not found`);
            }

            return UserDto.fromDataToDomain(userMatched) as User;
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error.errors.map((err: any) => err.message).join(', ');
                const errorStack = error.errors.map((err: any) => err.stack).join(', ');
                throw new DatabaseException(`Database error: ${errorMessage}`, errorStack);
            } else {
                throw new DatabaseException(error.message, error.stack)
            }
        }

    }

    async findAll(): Promise<User[]> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserModel)
            const users = await repository.find({
                where: { deletedAt: IsNull() },
                relations: ['roles']
            });

            return UserDto.fromDataToDomain(users) as User[];

        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error.errors.map((err: any) => err.message).join(', ');
                const errorStack = error.errors.map((err: any) => err.stack).join(', ');
                throw new DatabaseException(`Database error: ${errorMessage}`, errorStack);
            } else {
                throw new DatabaseException(error.message, error.stack)
            }
        }
    }

    async getByPage(page: number, limit: number): Promise<ResultPage<User>> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserModel);
            const [users, total] = await repository.findAndCount({
                where: { deletedAt: IsNull() },
                relations: ['roles'],
                skip: (page - 1) * limit,
                take: limit,
            })

            return {
                data: UserDto.fromDataToDomain(users) as User[],
                total,
                page,
                limit
            }
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error.errors.map((err: any) => err.message).join(', ');
                const errorStack = error.errors.map((err: any) => err.stack).join(', ');
                throw new DatabaseException(`Database error: ${errorMessage}`, errorStack);
            } else {
                throw new DatabaseException(error.message, error.stack)
            }
        }
    }
}