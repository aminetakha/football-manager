import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"
import { hashPassword, verifyPassword } from "../../utils/functions";
import { ValidationError } from "../../utils/errors";

export const authenticate = async (email: string, password: string) => {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if(result.length > 0){
        const { id, password: storedPassword, salt, email } = result[0]
        const isValid = verifyPassword(password, salt, storedPassword);
        if(!isValid){
            throw new ValidationError({ message: 'Email or password is uncorrect', statusCode: 401 })
        }
        return { id, email };
    }
    const { salt, hashedPassword } = hashPassword(password);
    const insertedUser = await db.insert(users).values({ email, password: hashedPassword, salt });
    return { id: insertedUser[0].insertId, email };
}