import { UUIDV4 } from 'sequelize';
import { Column, Model, Table, AllowNull, DataType, PrimaryKey, HasMany, Unique } from 'sequelize-typescript';

import { Post } from 'src/post/post.model';

@Table
export class User extends Model {
    @AllowNull(false)
    @PrimaryKey
    @Unique
    @Column({ type: DataType.UUID, defaultValue: UUIDV4 })
    id: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    name: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    username: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    password: string;

    @HasMany(() => Post)
    posts: Post[];
}
