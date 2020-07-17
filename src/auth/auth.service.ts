import UserDao from "../repository/user.dao";
import bcrypt from "bcrypt";
import { UserDto } from "../interface/user.interface";

export class AuthService {
    constructor(private userDao: UserDao) { }

    public async validateUser(username: string, password: string): Promise<UserDto | null> {
        const user = await this.userDao.userByUsername.load(username) as UserDto;
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        };
        return null;
    }
}
