import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Issue } from 'src/issue/entities/issue.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('Component')
export class Component {
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
  @ManyToOne(()=>Issue , (issue)=>issue.components)
  issue : Issue; 
}
