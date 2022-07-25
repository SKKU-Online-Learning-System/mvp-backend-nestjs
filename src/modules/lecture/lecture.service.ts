import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LectureEntity } from 'src/entities/lecture.entity';
import { SectionEntity } from 'src/entities/section.entity';

@Injectable()
export class LectureService {
    constructor(private dataSource:DataSource){}

    async getLecturesByCourseId(id: number){
        const lectures = await this.dataSource
            .getRepository(SectionEntity)
            .find({
                where:{
                    courseId : id,
                },
                relations: {
                    lectures: true,
                },
                select:{
                    id: true,
                    title: true,
                    courseId : true,
                    lectures: {
                        id: true,
                        title: true,
                        duration: true,
                        filename: true,
                        createdAt : true
                    },
                },
            });
        return lectures;
    }
}
