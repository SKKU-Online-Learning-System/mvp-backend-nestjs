import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
class LauchingEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: number;

    @Column()
    isProcessed: boolean

}

export { LauchingEvent as LaunchingEventEntity }