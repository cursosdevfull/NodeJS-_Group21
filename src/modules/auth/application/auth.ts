import { EmailVO, StringVO } from '../../../core/value-objects';

export type AuthLoginProps = {
    email: string;
    password: string;
}

export type AuthRefreshProps = {
    refreshToken: string;
}

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
}

export type AuthUserData = {
    userId: number;
    name: string;
    email: string;
    roles: string[];
}

export class Auth {
    private email!: string;
    private password!: string;
    private refreshToken?: string;

    constructor(props: AuthLoginProps | AuthRefreshProps) {
        if ('email' in props && 'password' in props) {
            // Login constructor
            const email = new EmailVO("email", props.email);
            this.email = email.value;

            const password = new StringVO("password", props.password, 5);
            this.password = password.value;
        } else {
            // Refresh constructor
            const refreshToken = new StringVO("refreshToken", props.refreshToken, 10);
            this.refreshToken = refreshToken.value;
        }
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRefreshToken(): string | undefined {
        return this.refreshToken;
    }
}
