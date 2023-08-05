import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Issue } from 'src/issue/entities/issue.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Field(()=>Issue)
  @ManyToOne(()=>Issue , (issue)=>issue)
  issue : Issue ;
}