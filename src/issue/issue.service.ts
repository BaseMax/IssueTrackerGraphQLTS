import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from 'src/component/entities/component.entity';
import { StatusResult } from 'src/shared/status-result/status-result';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ChangeIssueStatusInput } from './dto/change-issue-status.input';
import { CreateIssueInput } from './dto/create-issue.input';
import { UpdateIssueInput } from './dto/update-issue.input';
import { Issue } from './entities/issue.entity';
import { Priority } from './enums/priority.enum';
import { Status } from './enums/status.enum';

type Where = FindOptionsWhere<Issue>

@Injectable()
export class IssueService {

  constructor(
    @InjectRepository(Issue)
    private readonly issueRepo:Repository<Issue>
  ){}

  async findAll():Promise<Issue[]>{
    return await this.issueRepo.find({
      relations : {
        comments : true ,
        attachments : true , 
      }
    })
  }

  async findAllWhare(where : Where):Promise<Issue[]>{
    return await this.issueRepo.find({
      where , 
      relations : {
        comments : true , 
        attachments : true , 
      }
    })
  }

  async findOne(where:Where):Promise<Issue>{
    const issue = await this.issueRepo.findOne({
      where , 
      relations:{
        comments : true , 
        attachments : true , 
      }
    }) ;

    if(!issue){
      throw new NotFoundException('issue not found')
    }

    return issue ; 
  }


  async findOpenIssues():Promise<Issue[]>{
    return await this.findAllWhare({status : Status.OPEN})
  }

  async findCloseIssues():Promise<Issue[]>{
    return await this.findAllWhare({status : Status.CLOSE})
  }

  async findLowPriorityIssues():Promise<Issue[]>{
    return await this.findAllWhare({priority : Priority.LOW})
  }

  async findHighPriorityIssues():Promise<Issue[]>{
    return await this.findAllWhare({priority : Priority.HIGH});
  }

  async findMediumPriorityIssues():Promise<Issue[]>{
    return await this.findAllWhare({priority : Priority.MEDIUM});
  }

  async findIssuesByPriority(priority:Priority):Promise<Issue>{
    return await this.findOne({priority});
  }

  async findIssuesByAssignee(assignee:string):Promise<Issue>{
    return await this.findOne({assignee});
  }

  async findIssuesByComponent(componentId:string):Promise<Issue[]>{
    return await this.findAllWhare({
      components : {
        id : componentId ,
      }
    })
  }

  async findIssuesByProject(projectId:string):Promise<Issue[]>{
    return await this.findAllWhare({
      projects : {
        id : projectId ,
      }
    })
  }

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


  async assignIssue(issueId:string , assignee:string):Promise<StatusResult>{
    try {
      const issue = await this.findOne({id:issueId});

      issue.assignee = assignee ;

      await this.issueRepo.save(issue);
    } catch (error) {
      return {
        message : error.message , 
        success : false ,
      }
    }

    return {
      message : 'item edited successfully' , 
      success : true 
    }
  }

  async changeIssueStatus(changeIssueStatusInput:ChangeIssueStatusInput):Promise<StatusResult>{
     let {
      issueId , 
      status , 
     } = changeIssueStatusInput ;  


     try {
      const issue = await this.findOne({id : issueId}) ;
      
      // chnage status 
      issue.status = status ; 

      await this.issueRepo.save(issue)
     } catch (error) {
      return {
        message : error.message , 
        success : false , 
      }
     }

     return {
      message : 'item edited successfully' , 
      success : true , 
     }
  }

  async changeIssuePriority(issueId : string , priority:Priority):Promise<StatusResult>{
    try {
      const issue = await this.findOne({id : issueId}) ;

      issue.priority = priority ; 

      await this.issueRepo.save(issue) ;
    } catch (error) {
      return {
        message : error.message , 
        success : false , 
      }
    }

    return {
      message : 'item edited successfully' , 
      success : true  , 
    }
  }

  async removeTagFromIssue(issueId:string , tag:string):Promise<StatusResult>{
    try {
      let issue = await this.findOne({id:issueId});

      issue.tags.filter(item=> item !== tag) ;

      await this.issueRepo.save(issue) ;
    } catch (error) {
      return {
        success : false , 
        message : error.message , 
      }
    }

    return {
      message : 'item removed successfully' , 
      success : false , 
    }
  }

  async removeCloseIssue():Promise<StatusResult>{
    await this.issueRepo.delete({status : Status.CLOSE })
    return {
      success : true , 
      message : 'issue close removed'
    }
  }

  async remove(id: string):Promise<StatusResult>{
    await this.issueRepo.delete({id}) ;

    return {
      message : 'item removed successfully' , 
      success : true , 
    }
  }

  async removeAll():Promise<StatusResult>{
    await this.issueRepo.clear()
    return {
      message : 'all item removed successfully' , 
      success : true , 
    }
  }
}

