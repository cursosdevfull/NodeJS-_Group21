import { AuthPort } from "./ports/auth.port";
import { Auth, AuthLoginProps, AuthRefreshProps, AuthTokens, AuthUserData } from "./auth";
import { UnauthorizedException } from '../../../core/exceptions/handles';

export class AuthApplication {
    constructor(private readonly port: AuthPort) { }

    async login(props: AuthLoginProps): Promise<AuthTokens> {
        const auth = new Auth(props);

        // 1. Buscar usuario por email
        const user = await this.port.findUserByEmail(auth.getEmail());
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 2. Validar password
        const userProps = user.properties();
        const isValidPassword = await this.port.validatePassword(auth.getPassword(), userProps.password);
        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 3. Generar nuevo refreshToken
        const newRefreshToken = this.port.generateRefreshToken();

        // 4. Actualizar refreshToken en base de datos
        await this.port.updateUserRefreshToken(userProps.userId!, newRefreshToken);

        // 5. Preparar datos del usuario para el JWT
        const userData: AuthUserData = {
            userId: userProps.userId!,
            name: userProps.name,
            email: userProps.email,
            roles: userProps.roles.map(role => role.name).filter(name => name !== undefined) as string[]
        };

        // 6. Generar tokens
        const tokens = await this.port.generateTokens(userData);

        return {
            accessToken: tokens.accessToken,
            refreshToken: newRefreshToken
        };
    }

    async refreshToken(props: AuthRefreshProps): Promise<AuthTokens> {
        const auth = new Auth(props);

        // 1. Buscar usuario por refreshToken
        const user = await this.port.findUserByRefreshToken(auth.getRefreshToken()!);
        if (!user) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        // 2. Generar nuevo refreshToken
        const newRefreshToken = this.port.generateRefreshToken();

        // 3. Actualizar refreshToken en base de datos
        const userProps = user.properties();
        await this.port.updateUserRefreshToken(userProps.userId!, newRefreshToken);

        // 4. Preparar datos del usuario para el JWT
        const userData: AuthUserData = {
            userId: userProps.userId!,
            name: userProps.name,
            email: userProps.email,
            roles: userProps.roles.map(role => role.name).filter(name => name !== undefined) as string[]
        };

        // 5. Generar nuevo accessToken
        const tokens = await this.port.generateTokens(userData);

        return {
            accessToken: tokens.accessToken,
            refreshToken: newRefreshToken
        };
    }
}
