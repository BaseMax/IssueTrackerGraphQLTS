import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class AddCommentToIssueInput{
    @Field(()=>String)
    @IsNotEmpty() 
    id : string ; 
    
    @Field(()=>String)
    @IsNotEmpty()
    content : string  ;
}