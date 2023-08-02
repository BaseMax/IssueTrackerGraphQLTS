import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueService } from 'src/issue/issue.service';
import { StatusResult } from 'src/shared/status-result/status-result';
import { Repository } from 'typeorm';
import { CreateAttachmentInput } from './dto/create-attachment.input';
import { UpdateAttachmentInput } from './dto/update-attachment.input';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepo:Repository<Attachment> , 
    private readonly issueService:IssueService , 
  ){}
  async findAll():Promise<Attachment[]>{
    return await this.attachmentRepo.find()
  }

  async findOne(id:string):Promise<Attachment>{
    const attachment = await this.attachmentRepo.findOne({where : {id}}) ;

    if(!attachment){
      throw new NotFoundException('Attachment is not found')
    }

    return attachment ; 
  }

  async addAttachmentToIssue(createAttachmentInput:CreateAttachmentInput):Promise<StatusResult>{
    let { 
      description , 
      fileUrl , 
      issueId , 
    } = createAttachmentInput ; 
    let attachment:Attachment ; 
    

    try {
      const issue = await this.issueService.findOne({id : issueId});
      
      attachment = await this.attachmentRepo.create({
        description , 
        fileUrl , 
        issue , 
      }) ;

      await this.attachmentRepo.save(attachment);

    } catch (error) {
      return {
        message : error.message , 
        success : false , 
      }
    }

    return {
      message : 'item created successfully' , 
      success : true , 
      id : attachment.id  ,
    }
  }

  async update(id: string, updateAttachmentInput: UpdateAttachmentInput):Promise<StatusResult>{
    const {
      fileUrl , 
      description , 
    } = updateAttachmentInput ; 


    try {
      await this.findOne(id);

      await this.attachmentRepo.update({id} , {
        fileUrl , 
        description , 
      })
    } catch (error) {
      return {
        success : false , 
        message : error.message ,
      }
    }

    return {
      message : 'item edited successfully' , 
      success : true , 
    }
  }

  async remove(id:string):Promise<StatusResult>{
    await this.attachmentRepo.delete({id}) ; 

    return {
      message : 'item removed successfully' , 
      success : true , 
    }
  }
}
