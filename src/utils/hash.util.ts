import bcrypt from 'bcryptjs'

// Encriptamos
export const encrypt = async (textPlain: string): Promise<string> => { 
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}

// Comparamos
export const compare = async (passwordPlain: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}