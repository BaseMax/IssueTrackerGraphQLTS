import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Attachment } from 'src/attachment/entities/attachment.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Component } from 'src/component/entities/component.entity';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Priority } from '../enums/priority.enum';
import { Status } from '../enums/status.enum';

@ObjectType()
@Entity('Issue')
export class Issue {
  @Field(()=>ID)
  @PrimaryGeneratedColumn('uuid')
  id : string ; 

  @Field(()=>String)
  @Column({ type : 'varchar'})
  title : string ; 

  @Field(()=>String)
  @Column({ type : 'varchar'})
  description : string ; 

  @Field(()=>String)
  @Column({ type : 'varchar' , nullable : false })
  priority : Priority ;

  @Field(()=>String)
  @Column({ type : 'varchar' ,nullable : false })
  status : Status;

  @Field(()=>String)
  @Column({ type : 'varchar'})
  assignee : string ; 


  @Field(()=>[String])
  @Column({ type : 'varchar' , array : true })
  labels : string[] ; 

  @Field(()=>[String])
  @Column({ type : 'varchar' , array : true})
  tags : string[];

  @Field(()=>[Comment])
  @OneToMany(()=>Comment , (commnet)=>commnet.issue)
  comments : Comment[]

  @Field(()=>[Attachment])
  @OneToMany(()=>Attachment , (attachment)=>attachment.issue)
  attachments : Attachment[]

  @Field(()=>[Component])
  @OneToMany(()=>Component , (component)=>component.issue)
  components : Component[]

  @Field(()=>[Project])
  @OneToMany(()=>Project , (project)=>project.issue)
  projects : Project[]
}

