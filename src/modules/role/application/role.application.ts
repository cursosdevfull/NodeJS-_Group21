import { RolePort } from "./ports/role.port";
import { Role, RoleUpdateProps } from "./role";
import { NotFoundException } from '../../../core/exceptions/handles';
import { ResultPage } from '../../../core/types/result-page';

export class RoleApplication {
    constructor(private readonly port: RolePort) { }

    async create(role: Role) {
        return this.port.save(role);
    }

    async findById(id: number) {
        return this.port.findById(id);
    }

    async findAll() {
        return this.port.findAll();
    }

    async update(roleId: number, props: RoleUpdateProps) {
        const role = await this.port.findById(roleId);
        if (role) {
            role.update(props);
            return this.port.save(role);
        }
        throw new NotFoundException(`Role with id ${roleId} not found`);
    }

    async delete(roleId: number) {
        const role = await this.port.findById(roleId);
        if (role) {
            return this.port.save(role);
        }
        throw new NotFoundException(`Role with id ${roleId} not found`);
    }

    async getByPage(page: number, limit: number): Promise<ResultPage<Role>> {
        return this.port.getByPage(page, limit);
    }
}
