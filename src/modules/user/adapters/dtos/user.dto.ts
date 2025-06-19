import { RoleModel } from "src/modules/role/adapters";
import { User, UserProps } from "../../application";
import { UserModel } from "../models";
import { Role } from '../../application/entities/role';

export class UserDto {
    static fromDomainToData(domain: User | User[]): UserModel | UserModel[] {
        if (Array.isArray(domain)) {
            return domain.map(user => this.fromDomainToData(user)) as UserModel[];
        }

        const props = domain.properties();
        const model = new UserModel();
        model.userId = props.userId!;
        model.name = props.name;
        model.lastname = props.lastname;
        model.email = props.email;
        model.phone = props.phone;
        model.password = props.password;
        model.refreshToken = props.refreshToken;
        model.createdAt = props.createdAt;
        model.updatedAt = props.updatedAt;
        model.deletedAt = props.deletedAt;
        model.roles = props.roles as RoleModel[];

        return model;
    }

    static fromDataToDomain(data: UserModel | UserModel[]): User | User[] {
        if (Array.isArray(data)) {
            return data.map(user => this.fromDataToDomain(user)) as User[];
        }

        const props: UserProps = {
            userId: data.userId,
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            deletedAt: data.deletedAt,
            password: data.password,
            refreshToken: data.refreshToken,
            roles: data.roles as Role[]
        }

        return new User(props)
    }
}