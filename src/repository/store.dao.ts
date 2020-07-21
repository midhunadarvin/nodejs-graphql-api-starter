import DataLoader from 'dataloader';
import { mapTo } from '../utils';
import db from '../db';
import { StoreDto } from '../interface/store.interface';
class StoreDao {
    /*
    * Data loaders
    * ------------------------------------------------------------------------ */
    public async getStores(): Promise<StoreDto[]> {
        return db
            .table('stores')
            .select()
            .then((rows: any[]) => {
                console.log(rows);
                return rows.map(x => {
                    this.storeById.prime(x.id, x);
                    return x;
                })
            });
    }

    storeById = new DataLoader(keys =>
        db
            .table('stores')
            .whereIn('id', keys as string[])
            .select()
            .then(mapTo(keys, (x: any) => x.id)),
    );
}

export default StoreDao;