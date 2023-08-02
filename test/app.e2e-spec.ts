import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication  } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Issue } from 'src/issue/entities/issue.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Attachment } from 'src/attachment/entities/attachment.entity';
import { Priority } from 'src/issue/enums/priority.enum';
import { Status } from 'src/issue/enums/status.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let issueRepo : Repository<Issue> ; 
  let commentRepo : Repository<Comment> ; 
  let attachmentRepo : Repository<Attachment>  


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    issueRepo = app.get<Repository<Issue>>(getRepositoryToken(Issue));
    commentRepo = app.get<Repository<Comment>>(getRepositoryToken(Comment));
    await app.init();
  });

  afterAll(async ()=>{
    await app.close()
  })


  describe("issue", () => {
    it("must create issue", async () => {
      const mutation = `mutation createIsssue($createIssueInput: createIssueInput!) {
        createIssue(createIssueInput: $createIssueInput) {
          success , 
          message , 
          id  
        }
      }`;
      const variables = {
        createIssueInput : {
          title : 'test title' , 
          description : 'test description' , 
          assignee : 'test' , 
          labels : ['test lables' , 'labe'] , 
          tags : ['tags' , 'test'] , 
          priority : Priority.LOW , 
          status : Status.CLOSE ,
        }
      };

      const response = await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: mutation,
          variables,
        });

      expect(response.body.success).toBe(true);
      
    });

    it("must find All", async () => {
      const query = `query {
        findAllIssue {
          id, 
          title , 
          description , 
          tags , 
          lables , 
        }
      }`;

      const response = await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: query
        });

      expect(response.status).toBe(200);
      });
  });
});