import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication  } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Priority } from 'src/issue/enums/priority.enum';
import { Status } from 'src/issue/enums/status.enum';
import { Repository } from 'typeorm';
import { Issue } from 'src/issue/entities/issue.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('app resolvers (e2e)', () => {
  let app: INestApplication;
  let issueRepo:Repository<Issue>; 
  let parentIssue:Issue ; 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule , 
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    issueRepo = moduleFixture.get(getRepositoryToken(Issue));


    const issue = await issueRepo.create({
      title : "issue for test" , 
      description : "create test for issue module" , 
      assignee : "test" , 
      status : Status.CLOSE , 
      priority : Priority.HIGH , 
      labels : [] ,
      tags : []
    })

    parentIssue = await issueRepo.save(issue) ;
    await app.init();
  });

  afterAll(async ()=>{
    await app.close()
    await issueRepo.clear()
  })

  describe('issue' , ()=>{
    it('find all issue' , async ()=>{
      return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query : `
          {
            findAllIssue {
              id , 
              title , 
              description , 
            }
          }
        `
      })
      .expect(200)
      .expect(({ body }) => {
        const issues = body.data.findAllIssue;
        expect(issues).toBeInstanceOf(Array);
        expect(issues.length).toBeGreaterThan(0);
      });
    })

    it('create issue' , async()=>{

      const mutation = `mutation createIssue ($createIssueInput: CreateIssueInput!) {
          createIssue (createIssueInput: $createIssueInput) {
              message
              success
              id
          }
      }`

      const variables = {
        createIssueInput: {
          title: "test",
          description: "test",
          priority: Priority.HIGH,
          status : Status.CLOSE , 
          assignee: "test",
          labels: [
            "test"
          ],
          tags: [
            "test-tag"
          ]
        }
      }

      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation , 
          variables 
        })
        .expect(200)
        .expect(({ body }) => {
          const comment = body.data.createIssue;
          expect(comment.success).toBe(true);
        });
      });

    })


    it('find issue by id' , async ()=>{
      const query = `
        query findOneIssue ($id: String!) {
          findOneIssue (id: $id) {
              id
              title
              description
              priority
              status
              assignee
              labels
              tags
          }
      }
      `

      const variables = {
        id : parentIssue.id ,
      }
      return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query : query , 
        variables , 
      })
      .expect(200)
      .expect(({ body }) => {
        const issue = body.data.findOneIssue;
        expect(issue).toBeDefined();
        expect(issue.title).toBe(parentIssue.title);
      });
    })

    it('update issue' , async ()=>{
      const mutation = `
        mutation updateIssue ($updateIssueInput: UpdateIssueInput!) {
          updateIssue (updateIssueInput: $updateIssueInput) {
              message
              success
              id
          }
      }
      `

      const variables = {
        updateIssueInput: {
          title: "test update issue",
          id: parentIssue.id , 
        }
      }

      return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query : mutation , 
        variables , 
      })
      .expect(200)
      .expect(({ body }) => {
        const result = body.data.updateIssue;
        expect(result.success).toBe(true);
      });
    })
})