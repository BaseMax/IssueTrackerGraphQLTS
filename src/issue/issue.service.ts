import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusResult } from 'src/common/entities/status-result';
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
    let {  } = createIssueInput
  }

  findAll() {
    return `This action returns all issue`;
  }

  async findOne(where:Where):Promise<Issue>{
    const issue = await this.issueRepo.findOne({where}) ;

    if(!issue){
      throw new NotFoundException('issue not found')
    }

    return issue ; 
  }

  update(id: string, updateIssueInput: UpdateIssueInput) {
    
  }

  remove(id: number) {
    return `This action removes a #${id} issue`;
  }
}

