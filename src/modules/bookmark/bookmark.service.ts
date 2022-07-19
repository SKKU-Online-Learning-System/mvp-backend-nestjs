import { Injectable, NotImplementedException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { LearningEntity } from "src/entities/learning.entity";

@Injectable()
export class BookmarkService{
    constructor(private dataSource: DataSource){}

    async getAllBookmark(user){
        const lists = await this.dataSource
            .createQueryBuilder()
            .from(LearningEntity, 'learning')
            .select('learning')
            .where('userId = :id', { id : user.id})
            .getMany();
        return lists;
    }

    async addBookmarkById(user, id:number){
        const { affected } = await this.dataSource
            .createQueryBuilder()
            .from(LearningEntity, 'learning')
            .where('userId = :uID AND courseId = :cID', {uID: user.id, cID: id})
            .update({
                bookmark : true
            })
            .execute();
        if( affected ){
            return { statusCode: 201, message: 'Bookmarked'};
        }else{
            throw new NotImplementedException(
                'bookmark.service: addBookmarkById - Nothing changed.',
            );
        }
    }
    async deleteBookmarkById(user, id:number){
        const { affected } = await this.dataSource
            .createQueryBuilder()
            .from(LearningEntity, 'learning')
            .where('userId = :uID AND courseId = :cID', {uID: user.id, cID: id})
            .update({
                bookmark : false
            })
            .execute();
        if( affected ){
            return { statusCode: 201, message: 'Unbookmarked'};
        }else{
            throw new NotImplementedException(
                'bookmark.service: deleteBookmarkById - Nothing changed.',
            );
        }
    }
}