import * as bcrypt from 'bcryptjs';

export const encrypt = async (text: string): Promise<string> => {
    return bcrypt.hash(text, 10);
}

export const compare = async (text: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(text, hash);
}
