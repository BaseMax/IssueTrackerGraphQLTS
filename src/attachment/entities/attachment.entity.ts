import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Issue } from 'src/issue/entities/issue.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('Attachment')
export class Attachment {
  @Field(()=>ID)
  @PrimaryGeneratedColumn('uuid')
  id : string ; 

  @Field()
  @Column({type : 'varchar' , nullable : false})
  fileUrl : string ; 

  @Field()
  @Column({type : 'varchar'})
  description : string ; 

  @Field(()=>Issue)
  @ManyToOne(()=>Issue , (issue)=>issue.attachments)
  issue : Issue ; 
}