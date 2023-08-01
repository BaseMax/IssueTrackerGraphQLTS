import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Priority } from '../enums/priority.enum';
import { Status } from '../enums/status.enum';

@InputType()
export class CreateIssueInput {
  @Field(()=>String)
  @IsNotEmpty()
  title : string ; 

  @Field(()=>String)
  @IsNotEmpty()
  description : string ; 

  @Field(()=>String)
  @IsNotEmpty()
  priority : Priority ;

  @Field(()=>String)
  @IsNotEmpty()
  status : Status;

  @Field(()=>String)
  @IsNotEmpty()
  assignee : string ; 

  @Field(()=>[String])
  @IsNotEmpty()
  labels : string[] ; 

  @Field(()=>[String])
  @IsNotEmpty()
  tags : string[];  
}
