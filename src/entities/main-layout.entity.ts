import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('main_layout')
export class MainLayout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    courseId: number;

    @Column({ length: 255 })
    thumbnailLink: string;

    @Column({ type: 'int' }) // 0 == 인기 컨텐츠, 1 == 신규 컨텐츠, 2 == 인기카테고리1 컨텐츠, 3 == 인기카테고리2 컨텐츠
    order: number;

    @Column({ type: 'int' })
    sequence: number; 

    @Column({ length: 30 })
    category: string;
    
}
