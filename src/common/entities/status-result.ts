import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StatusResult {
    @Field(()=>String)
    message : string ; 

    @Field(()=>Boolean)
    success : boolean ; 

    @Field(()=>String)
    id? : string ; 
}