import { ArrayVO, EmailVO, StringVO } from '../../../core/value-objects';
import { Role } from './entities';

export type UserEssentialProps = {
    name: string;
    lastname: string;
    email: string;
    password: string;
    roles: Role[];
}

export type UserOptionalProps = {
    userId: number;
    phone: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export type UserProps = UserEssentialProps & Partial<UserOptionalProps>;
export type UserUpdateProps = Partial<Omit<UserEssentialProps, "email"> & Pick<UserOptionalProps, "phone">>

export class User {
    private readonly userId: number | undefined
    private name!: string
    private lastname!: string
    private email!: string
    private password!: string
    private refreshToken!: string
    private roles!: Role[]

    private phone: string | undefined

    private createdAt!: Date
    private updatedAt: Date | undefined
    private deletedAt: Date | undefined

    constructor(props: UserProps) {
        const name = new StringVO("name", props.name, 3);
        this.name = name.value;

        const lastname = new StringVO("lastname", props.lastname, 3);
        this.lastname = lastname.value;

        const email = new EmailVO("email", props.email);
        this.email = email.value;

        const password = new StringVO("password", props.password, 5);
        this.password = password.value;

        if (props.userId && props.userId < 1) {
            throw new Error("User ID must be a positive number");
        }

        if (props.roles) {
            const roles = new ArrayVO("roles", props.roles, 1);
            this.roles = roles.value;
        } else {
            this.roles = [];
        }

        if (props.phone) {
            this.phone = props.phone.trim()
        }

        this.userId = props.userId
        this.refreshToken = props.refreshToken || "";
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || undefined;
        this.deletedAt = props.deletedAt || undefined;
    }

    delete() {
        this.deletedAt = new Date();
    }

    update(props: UserUpdateProps) {
        if (props.name) {
            const name = new StringVO("name", props.name, 3);
            this.name = name.value;
        }

        if (props.lastname) {
            const lastname = new StringVO("lastname", props.lastname, 3);
            this.lastname = lastname.value;
        }

        if (props.phone) {
            this.phone = props.phone.trim();
        }

        if (props.roles) {
            const roles = new ArrayVO("roles", props.roles, 1);
            this.roles = roles.value;
        }

        this.updatedAt = new Date();
    }

    properties() {
        return {
            userId: this.userId,
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            roles: this.roles,
            password: this.password,
            refreshToken: this.refreshToken,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        };
    }
}