import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Issue } from 'src/issue/entities/issue.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('Commant')
export class Comment {
  @Field(()=>ID)
  @PrimaryGeneratedColumn('uuid')
  id : string ; 

  @Field()
  @Column({type : 'varchar' , nullable : false})
  content : string ; 


  @Field(()=>Issue)
  @ManyToOne(()=>Issue , (issue)=>issue.comments)
  issue : Issue ; 
}