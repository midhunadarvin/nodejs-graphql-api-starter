import DataLoader from 'dataloader';
import { mapTo } from '../utils';
import db from '../db';
import { StoreDto } from '../interface/store.interface';
class StoreDao {
    /*
    * Data loaders
    * ------------------------------------------------------------------------ */
    public async getStores(params: { latitude?: number; longitude?: number; distance?: number }): Promise<StoreDto[]> {
        const { latitude, longitude, distance } = params;
        let query = db.table('stores');
        if (latitude && longitude && distance) {
            query = query.andWhereRaw('((point(latitude, longitude) <@> point(?,?)) * 1609.34) < ?', [latitude, longitude, distance])
        }
        return query.select()
            .then((rows: any[]) => {
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