import { Injectable, UploadedFiles } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LectureEntity } from 'src/entities/lecture.entity'

@Injectable()
export class LectureService {
    constructor(private dataSource: DataSource) {}

    async getLecturePathForTest(id:number) {
        const url = process.env.S3_URL;
        const bucket = process.env.BUCKET;
        const path = 'lectures/'
        
        return url+bucket+path;
    }

    async getLecturePathByLectureId(id:number)  {
        return await this.dataSource
            .getRepository(LectureEntity)
            .find({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    title: true,
                    filename: true,
                },
        })
    }
}
