import DataLoader from 'dataloader';
import { mapTo } from '../utils';
import db from '../db';
import { UserDto } from '../interface/user.interface';
class UserDao {
    /*
    * Data loaders
    * ------------------------------------------------------------------------ */
    public async getUsers(): Promise<UserDto[]> {
        return db
            .table('users')
            .select()
            .then((rows: any[]) => {
                return rows.map(x => {
                    this.userByUsername.prime(x.username, x);
                    return x;
                })
            });
    }

    userById = new DataLoader(keys =>
        db
            .table('users')
            .whereIn('id', keys as string[])
            .select()
            .then((rows: any[]) => {
                return rows.map(x => {
                    this.userByUsername.prime(x.username, x);
                    return x;
                })
            })
            .then(mapTo(keys, (x: any) => x.id)),
    );

    userByUsername = new DataLoader(keys =>
        db
            .table('users')
            .whereIn('username', keys as string[])
            .select()
            .then((rows: any[]) =>
                rows.map((x: any) => {
                    this.userById.prime(x.id, x);
                    return x;
                }),
            )
            .then(mapTo(keys, (x: any) => x.username)),
    );
}

export default UserDao;