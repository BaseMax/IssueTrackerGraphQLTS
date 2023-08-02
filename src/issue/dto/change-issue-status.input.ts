import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Status } from "../enums/status.enum";


@InputType()
export class ChangeIssueStatusInput {
    
    @Field(()=>ID)
    @IsNotEmpty()
    issueId : string ; 
    
    @Field()
    @IsNotEmpty()
    status : Status ;
}