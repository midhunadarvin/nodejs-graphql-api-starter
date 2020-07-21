import DataLoader from 'dataloader';
import { mapTo } from '../utils';
import db from '../db';
class StoreDao {
    /*
    * Data loaders
    * ------------------------------------------------------------------------ */

    storeById = new DataLoader(keys =>
        db
            .table('stores')
            .whereIn('id', keys as string[])
            .select()
            .then((rows: any[]) => {
                return rows;
            })
            .then(mapTo(keys, (x: any) => x.id)),
    );
}

export default StoreDao;