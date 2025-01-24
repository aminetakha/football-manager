import { eq } from "drizzle-orm"
import { db } from "../../db"
import { teams, users } from "../../db/schema"
import { hashPassword, verifyPassword } from "../../utils/functions";
import { ValidationError } from "../../utils/errors";
import { createTeamTask } from "../teams/teams.routes";

const createUser = async (email: string, password: string) => {
    const { salt, hashedPassword } = hashPassword(password);
    const insertedUser = await db.insert(users).values({ email, password: hashedPassword, salt });
    createTeamTask(insertedUser[0].insertId);
    return { id: insertedUser[0].insertId, email, hasTeam: false };
}

export const authenticate = async (email: string, password: string): Promise<{ id: number; email: string; hasTeam: boolean; }> => {
    const result = await 
        db.select()
        .from(users)
        .where(eq(users.email, email))
        .leftJoin(teams, eq(teams.userId, users.id))
        .limit(1);

    if(result.length > 0){
        const { id, password: storedPassword, salt, email } = result[0].users;
        const isValid = verifyPassword(password, salt, storedPassword);
        if(!isValid){
            throw new ValidationError({ message: 'Email or password is uncorrect', statusCode: 401 })
        }
        return { id, email, hasTeam: !!result[0].teams };
    }
    return createUser(email, password);
}
