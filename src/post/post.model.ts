import { UUIDV4 } from 'sequelize';
import { Column, Model, Table, AllowNull, DataType, Unique, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';

import { User } from 'src/user/user.model';

@Table
export class Post extends Model {
    @AllowNull(false)
    @PrimaryKey
    @Unique
    @Column({ type: DataType.UUID, defaultValue: UUIDV4 })
    id: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    videoUrl: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    description: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;
    
    @BelongsTo(() => User)
    user: User;
}

