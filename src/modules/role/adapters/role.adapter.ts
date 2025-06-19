import { RolePort } from "../application/ports/role.port";
import { Role } from "../application/role";
import { RoleModel } from "./models";
import { RoleDto } from "./dtos";
import { DatabaseBootstrap } from '../../../bootstrap/database.bootstrap';
import { DatabaseException, NotFoundException } from '../../../core/exceptions/handles';
import { ResultPage } from '../../../core/types/result-page';

export class RoleAdapter implements RolePort {
    async save(role: Role): Promise<Role> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(RoleModel)
            const model = RoleDto.fromDomainToData(role) as RoleModel;
            const result = await repository.save(model);

            return RoleDto.fromDataToDomain(result) as Role;
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

    async findById(roleId: number): Promise<Role> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(RoleModel)
            const roleMatched = await repository.findOne({ where: { roleId } });

            if (!roleMatched) {
                throw new NotFoundException(`Role with id ${roleId} not found`);
            }

            return RoleDto.fromDataToDomain(roleMatched) as Role;
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

    async findAll(): Promise<Role[]> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(RoleModel)
            const roles = await repository.find();

            return RoleDto.fromDataToDomain(roles) as Role[];

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

    async getByPage(page: number, limit: number): Promise<ResultPage<Role>> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(RoleModel)
            const [roles, total] = await repository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            })

            return {
                data: RoleDto.fromDataToDomain(roles) as Role[],
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
