import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusResult } from 'src/shared/status-result/status-result';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) 
    private readonly commentRepo:Repository<Comment> , 
  ){}

  async create(createCommentInput: CreateCommentInput):Promise<StatusResult>{
    const { content } = createCommentInput ; 
    let comment:Comment ;

    try {
      comment = await this.commentRepo.create({ content });

      await this.commentRepo.save(comment) ;
    } catch (error) {
      return {
        message : error.message , 
        success : false , 
      }
    }

    return {
      message : 'item created successfully' , 
      success : true , 
      id : comment.id , 
    }; 
  }


  async findOne(id:string):Promise<Comment>{
    const comment = await this.commentRepo.findOneBy({id})

    if(!comment){
      throw new NotFoundException("comment not found") ;
    }

    return comment ; 
  }

  async update(id: string, updateCommentInput: UpdateCommentInput):Promise<StatusResult> {
    const statusResult:StatusResult = {
      message : 'item edited sucessfully' , 
      success : true ,
    }
    const { content } = updateCommentInput ; 

    try {
      await this.findOne(id);
      await this.commentRepo.update({id} , {content});

      statusResult.id = id ;
    } catch (error) {
      return {
        message : error.message , 
        success : false , 
      }
    }

    return statusResult ; 
  }

  async remove(id: string):Promise<StatusResult>{
    const statusResult:StatusResult = {
      message : 'item removed successfully', 
      success : true , 
    }

    await this.commentRepo.delete({id}) ; 

    return statusResult ; 
  }
}
