import { User } from "../user";
import { ResultPage } from '../../../../core/types/result-page';

export type UserPort = {
    save(user: User): Promise<User>;
    findById(userId: number): Promise<User>;
    findAll(): Promise<User[]>;
    getByPage(page: number, limit: number): Promise<ResultPage<User>>;
}