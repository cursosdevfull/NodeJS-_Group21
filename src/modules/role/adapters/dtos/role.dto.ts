import { Role, RoleProps } from "../../application";
import { RoleModel } from "../models";

export class RoleDto {
    static fromDomainToData(domain: Role | Role[]): RoleModel | RoleModel[] {
        if (Array.isArray(domain)) {
            return domain.map(role => this.fromDomainToData(role)) as RoleModel[];
        }

        const props = domain.properties();
        const model = new RoleModel();
        model.roleId = props.roleId;
        model.name = props.name;

        return model;
    }

    static fromDataToDomain(data: RoleModel | RoleModel[]): Role | Role[] {
        if (Array.isArray(data)) {
            return data.map(role => this.fromDataToDomain(role)) as Role[];
        }

        const props: RoleProps = {
            roleId: data.roleId,
            name: data.name
        }

        return new Role(props)
    }
}
