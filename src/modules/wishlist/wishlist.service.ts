import { 
    Injectable,
    NotImplementedException
 } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WishlistEntity } from 'src/entities/wishlist.entity';

@Injectable()
export class WishlistService{
    constructor(private dataSource: DataSource){}

    async getAllWishlist(user){
        const lists = await this.dataSource
            .createQueryBuilder()
            .from(WishlistEntity, 'wishlist')
            .select('wishlist')
            .where('userId = :id', {id : user.id})
            .getMany()
        return lists;
    }

    async addWishlistById( user, id : number ) {
        const {
            raw: {affectedRows},
        } = await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(WishlistEntity)
            .values({
                userId : user.id,
                courseId : id
            })
            .execute();
        if (affectedRows){
            return { statusCode: 201, message: 'Created'};
        } else { 
            throw new NotImplementedException(
                'wishlist.service : addWishList - Nothing inserted.',
            );
        }
    }

    async deleteWishlistById( user, id : number ){
        const { affected } = await this.dataSource
            .createQueryBuilder()
            .from(WishlistEntity, 'wishlist')
            .where('courseId = :id AND userId = :uID ', {id: id, uID: user.id})
            .delete()
            .execute();
            if ( affected ){
            return { statusCode: 201, message: 'Deleted'};
        } else {
            throw new NotImplementedException(
                'wishlist.service: deleteWishlistById - Nothing deleted.',
            );
        }
    }
}