import { Role } from "../role";
import { ResultPage } from '../../../../core/types/result-page';

export type RolePort = {
    save(role: Role): Promise<Role>;
    findById(roleId: number): Promise<Role>;
    findAll(): Promise<Role[]>;
    getByPage(page: number, limit: number): Promise<ResultPage<Role>>;
}
