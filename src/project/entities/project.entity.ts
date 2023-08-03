import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('Project')
export class Project {
  @Field(()=>ID)
  @PrimaryGeneratedColumn('uuid')
  id : string ; 

  @Field()
  @Column({type : 'varchar' , nullable : false})
  title : string ; 

  @Field()
  @Column({type : 'varchar' , nullable : false })
  description : string ; 
}