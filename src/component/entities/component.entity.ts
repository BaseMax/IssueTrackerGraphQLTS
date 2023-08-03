import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
