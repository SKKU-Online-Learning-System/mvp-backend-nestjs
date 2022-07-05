import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Section{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type: 'varchar', length: 100})
    title: string;

    @Column({type: 'int'})
    course_id: number;
}