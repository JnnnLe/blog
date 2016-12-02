# Blog
Blog application with Node express

# API Doc

| Method | URI | Arguments | Returns | Comment |
|--------|-----|-----------|---------|---------|
| GET    | /   |           | HTML    | Returns static files from the server |
| GET    | /api/articles | | List of Articles | |
| GET    | /api/articles/:id | Article Id | | Use id to return article |
| POST   | /api/articles | Article | Article | Creates a new Article and returns it |
| PUT    | /api/articles | Article | Article | Updates an Article and returns it |
| DELTE  | /api/articles/:id | Article Id | | Delete article with Id |

## Article

 ```javascript
 {
  id: 1,
  title: 'First Article',
  abstract: 'First Blog',
  date: 'Thu Nov 17 2016 12:03:08 GMT-0800 (Pacific Standard Time)'
  body: 'My First Article on the Blog!',
  tags: ['Blog', 'First', 'thanks RG']
 }
 ```
 
# User Stories
 
- [ ] As a Bloger I want to create a new Article
- [ ] As a Bloger I want to delete an Article
- [ ] As a Bloger I want to update and Article
- [ ] As a Visitor I want to see the most recent Articles
- [ ] As a Visitor I want to click on a title and read the Article

# Developer Notes

- [x] Set up an NPM application (npm init)
- [x] Create a Node Express server that mimics the API Doc
- [ ] When a user enters root url, serve up a static HTML welcome page from /client folder
- [x] Store a list of Articles in memory on the server
- [x] Test CRUD operations with Postman
- [ ] Create a simple layout with HTML and CSS
- [ ] Add a client framework of choice to make the client communicate with the server (Backbone, jQuery, React, Angular)
- [x] Set up MongoDB to persist the articles through server restart
- [x] Use Mongoose to Query the Database
- [ ] Add login to ensure the POST, PUT and DELETE endpoints are secure
- [ ] Add handlers in the client to handle 401 (unauthorized)
- [ ] Set up a production enviroment on AWS
