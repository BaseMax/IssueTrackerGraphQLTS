import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusResult } from 'src/shared/status-result/status-result';
import { Repository } from 'typeorm';
import { CreateComponentInput } from './dto/create-component.input';
import { UpdateComponentInput } from './dto/update-component.input';
import { Component } from './entities/component.entity';

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(Component)
    private readonly componentRepo:Repository<Component>
  ){}


  async findAll():Promise<Component[]>{
    return await this.componentRepo.find()
  }

  async findOne(id:string):Promise<Component>{
    const component = await this.componentRepo.findOneBy({id})

    if(!component){
      throw new NotFoundException("component not found") ;
    }

    return component ; 
  }

  async create(createComponentInput:CreateComponentInput):Promise<StatusResult>{
    const {
      description , 
      title , 
    } = createComponentInput ; 

    let component:Component ; 

    try {
      component = await this.componentRepo.create({
        title , 
        description ,
      });

      await this.componentRepo.save(component) ; 
    } catch (error) {
      return {
        success : false , 
        message : error.message ,
      }
    }

    return {
      message : 'item created successfully' , 
      success : true , 
      id : component.id , 
    }
  }

  async update(id: string, updateComponentInput: UpdateComponentInput):Promise<StatusResult> {
    const statusResult:StatusResult = {
      message : 'item edited sucessfully' , 
      success : true ,
    }
    const { title , description} = updateComponentInput ; 

    try {
      await this.findOne(id);
      await this.componentRepo.update({id} , {title , description});

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

    await this.componentRepo.delete({id}) ; 

    return statusResult ; 
  }
}
