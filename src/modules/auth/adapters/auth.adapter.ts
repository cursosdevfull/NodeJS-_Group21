import { AuthPort } from "../application/ports/auth.port";
import { User } from "../../user/application/user";
import { UserModel } from "../../user/adapters/models";
import { UserDto } from "../../user/adapters/dtos";
import { DatabaseBootstrap } from '../../../bootstrap/database.bootstrap';
import { DatabaseException } from '../../../core/exceptions/handles';
import { AuthTokens, AuthUserData } from "../application/auth";
import { IsNull } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../../../env';

export class AuthAdapter implements AuthPort {
    private readonly JWT_SECRET = env.JWT_SECRET;
    private readonly JWT_EXPIRES_IN = '1h';

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserModel);
            const userMatched = await repository.findOne({
                where: { email, deletedAt: IsNull() },
                relations: ['roles'] // Asumiendo que hay una relación con roles
            });

            if (!userMatched) {
                return null;
            }

            return UserDto.fromDataToDomain(userMatched) as User;
        } catch (error: any) {
            throw new DatabaseException(error.message, error.stack);
        }
    }

    async findUserByRefreshToken(refreshToken: string): Promise<User | null> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserModel);
            const userMatched = await repository.findOne({
                where: { refreshToken, deletedAt: IsNull() },
                relations: ['roles'] // Asumiendo que hay una relación con roles
            });

            if (!userMatched) {
                return null;
            }

            return UserDto.fromDataToDomain(userMatched) as User;
        } catch (error: any) {
            throw new DatabaseException(error.message, error.stack);
        }
    }

    async updateUserRefreshToken(userId: number, refreshToken: string): Promise<void> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserModel);
            await repository.update(userId, { refreshToken });
        } catch (error: any) {
            throw new DatabaseException(error.message, error.stack);
        }
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error: any) {
            throw new DatabaseException(error.message, error.stack);
        }
    }

    async generateTokens(userData: AuthUserData): Promise<AuthTokens> {
        try {
            const payload = {
                userId: userData.userId,
                name: userData.name,
                email: userData.email,
                roles: userData.roles
            };

            const accessToken = jwt.sign(payload, this.JWT_SECRET, {
                expiresIn: this.JWT_EXPIRES_IN
            });

            return {
                accessToken,
                refreshToken: '' // Se asigna externamente en la aplicación
            };
        } catch (error: any) {
            throw new DatabaseException(error.message, error.stack);
        }
    }

    generateRefreshToken(): string {
        return uuidv4();
    }
}
