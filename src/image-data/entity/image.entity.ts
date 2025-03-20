import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: String, nullable: false, length: 50 })
    fileName!: string;

    @Column({ type: "longblob"})
    imageData!: Buffer;
}