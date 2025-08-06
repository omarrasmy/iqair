import * as crypto from 'crypto';

// Load the frontend's public key
const algorithm = 'aes-256-cbc';

export function encryptSymmetricKey(symKey: string): string {
    const buffer = Buffer.from(symKey, 'utf8');
    const encrypted = crypto.publicEncrypt(process.env.FRONTEND_PUBLIC_KEY, buffer);
    return encrypted.toString('base64');
}
export function encryptPlainText(plainText: any, symKey: string): { iv: string; description: string; title: string; type: string; } {
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(symKey, 'hex');
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(plainText), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), description: encrypted, type: null, title: null };
}