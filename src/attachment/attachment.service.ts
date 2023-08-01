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
  async findAll(createAttachmentInput: CreateAttachmentInput):Promise<Attachment[]>{
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

  update(id: number, updateAttachmentInput: UpdateAttachmentInput) {
    return `This action updates a #${id} attachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachment`;
  }
}
