import { StringVO } from '../../../core/value-objects';

export type RoleEssentialProps = {
    name: string;
}

export type RoleOptionalProps = {
    roleId: number;
}

export type RoleProps = RoleEssentialProps & Partial<RoleOptionalProps>;
export type RoleUpdateProps = Partial<RoleEssentialProps>;

export class Role {
    private readonly roleId!: number
    private name!: string

    constructor(props: RoleProps) {
        const name = new StringVO("name", props.name, 2);
        this.name = name.value;

        if (props.roleId && props.roleId < 1) {
            throw new Error("Role ID must be a positive number");
        }

        if (props.roleId) {
            Object.defineProperty(this, 'roleId', {
                value: props.roleId,
                writable: false,
                enumerable: true
            });
        }
    }

    update(props: RoleUpdateProps) {
        if (props.name) {
            const name = new StringVO("name", props.name, 2);
            this.name = name.value;
        }
    }

    properties() {
        return {
            roleId: this.roleId,
            name: this.name
        };
    }
}
