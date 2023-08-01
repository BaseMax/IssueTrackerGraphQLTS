import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusResult } from 'src/shared/status-result/status-result';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateIssueInput } from './dto/create-issue.input';
import { UpdateIssueInput } from './dto/update-issue.input';
import { Issue } from './entities/issue.entity';

type Where = FindOptionsWhere<Issue>

@Injectable()
export class IssueService {

  constructor(
    @InjectRepository(Issue)
    private readonly issueRepo:Repository<Issue>
  ){}
  async create(createIssueInput:CreateIssueInput):Promise<StatusResult>{
    let { 
      title,
      description , 
      assignee , 
      status , 
      priority , 
      labels , 
      tags , 
    } = createIssueInput ; 
    let issue:Issue ;
    
    try {
      issue = await this.issueRepo.create({
        title , 
        description , 
        assignee , 
        status , 
        priority , 
        labels , 
        tags , 
      }) ; 
      await this.issueRepo.save(issue) ; 
      
    } catch (error) {
      return {
        message : error.message , 
        success : false
      }
    }

    return {
      message : 'item created successfully' , 
      success : true , 
      id : issue.id ,
    }
  }

  async findAll():Promise<Issue[]>{
    return await this.issueRepo.find({
      relations : {
        comments : true ,
      }
    })
  }

  async findOne(where:Where):Promise<Issue>{
    const issue = await this.issueRepo.findOne({where , relations:{comments : true}}) ;

    if(!issue){
      throw new NotFoundException('issue not found')
    }

    return issue ; 
  }

  async update(id: string, updateIssueInput: UpdateIssueInput):Promise<StatusResult>{
    let {
      title , 
      description , 
      assignee , 
      status , 
      priority , 
      tags , 
      labels ,
    } = updateIssueInput ; 

    try {
      // check issue exist
      await this.findOne({id});
      
      await this.issueRepo.update({id},{
        title , 
        description , 
        assignee , 
        status , 
        priority , 
        tags , 
        labels , 
      });
    } catch (error) {
        return {
          message : error.message , 
          success : false 
        }
    }

    return {
      message : 'item edited successfully' , 
      success : true 
    }
  }

  async remove(id: string):Promise<StatusResult>{
    await this.issueRepo.delete({id}) ;

    return {
      message : 'item removed successfully' , 
      success : true , 
    }
  }
}

