import { Injectable } from '@nestjs/common';
import { CreateIssueInput } from './dto/create-issue.input';
import { UpdateIssueInput } from './dto/update-issue.input';

@Injectable()
export class IssueService {
  create(createIssueInput: CreateIssueInput) {
    return 'This action adds a new issue';
  }

  findAll() {
    return `This action returns all issue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} issue`;
  }

  update(id: number, updateIssueInput: UpdateIssueInput) {
    return `This action updates a #${id} issue`;
  }

  remove(id: number) {
    return `This action removes a #${id} issue`;
  }
}
