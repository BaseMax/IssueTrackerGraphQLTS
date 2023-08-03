import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication  } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Priority } from 'src/issue/enums/priority.enum';
import { Status } from 'src/issue/enums/status.enum';
import { Repository } from 'typeorm';
import { Issue } from 'src/issue/entities/issue.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

describe('app resolvers (e2e)', () => {
  let app: INestApplication;
  let issueRepo:Repository<Issue>; 
  let commentRepo:Repository<Comment>
  let parentIssue:Issue ; 
  let parentComment:Comment ; 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule , 
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    issueRepo = moduleFixture.get(getRepositoryToken(Issue));
    commentRepo = moduleFixture.get(getRepositoryToken(Comment));



    const issue = await issueRepo.create({
      title : "issue for test" , 
      description : "create test for issue module" , 
      assignee : "test" , 
      status : Status.CLOSE , 
      priority : Priority.HIGH , 
      labels : [] ,
      tags : []
    }) 


    const comment = await commentRepo.create({
      content : 'test'
    })

    parentIssue = await issueRepo.save(issue) ;
    parentComment = await commentRepo.save(comment) ;
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

  describe('comment' , ()=>{

    it('add comment to issue' , async ()=>{
      const mutation = `
      mutation addCommentToIssue ($addCommentToIssueInput: AddCommentToIssueInput!) {
          addCommentToIssue (addCommentToIssueInput: $addCommentToIssueInput) {
              message
              success
              id
          }
      }
      `

      const variables = {
        addCommentToIssueInput: {
          issueId: parentIssue.id ,
          content: " test comment"
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
        const result = body.data.addCommentToIssue;
        expect(result.success).toBe(true);
      });
    })

    it('find all commments' , async ()=>{

      const query = `
        query findOneComment ($id: String!) {
          findOneComment (id: $id) {
              id
              content
          }
      }
      `

      const variables = {
        id: parentComment.id , 
      }
      return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query , 
        variables , 
      })
      .expect(200) 
      .expect(({ body }) => {
        const result = body.data.findOneComment;
        expect(result.success).toBe(true);
      });
    })
  })
})