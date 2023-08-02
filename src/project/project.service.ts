import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusResult } from 'src/shared/status-result/status-result';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo:Repository<Project>
  ){}
  async findAll():Promise<Project[]>{
    return await this.projectRepo.find()
  }

  async findOne(id:string):Promise<Project>{
    const project = await this.projectRepo.findOne({where : {id}}) ;

    if(!project){
      throw new NotFoundException('Attachment is not found')
    }

    return project ; 
  }

  async create(createProjectInput:CreateProjectInput):Promise<StatusResult>{
    let { 
      title , 
      description , 
    } = createProjectInput ; 
    let project:Project ; 
    

    try {
      project = await this.projectRepo.create({
        title , 
        description , 
      }) ;

      await this.projectRepo.save(project);

    } catch (error) {
      return {
        message : error.message , 
        success : false , 
      }
    }

    return {
      message : 'item created successfully' , 
      success : true , 
      id : project.id  ,
    }
  }

  async update(id: string, updateProjectInput: UpdateProjectInput):Promise<StatusResult>{
    const {
      title , 
      description , 
    } = updateProjectInput ; 


    try {
      await this.findOne(id);

      await this.projectRepo.update({id} , {
        title , 
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
    await this.projectRepo.delete({id}) ; 

    return {
      message : 'item removed successfully' , 
      success : true , 
    }
  }
}
