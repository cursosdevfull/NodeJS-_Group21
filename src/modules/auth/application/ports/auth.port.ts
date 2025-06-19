import { User } from '../../../user/application/user';
import { AuthTokens, AuthUserData } from '../auth';

export type AuthPort = {
    findUserByEmail(email: string): Promise<User | null>;
    findUserByRefreshToken(refreshToken: string): Promise<User | null>;
    updateUserRefreshToken(userId: number, refreshToken: string): Promise<void>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    generateTokens(userData: AuthUserData): Promise<AuthTokens>;
    generateRefreshToken(): string;
}
