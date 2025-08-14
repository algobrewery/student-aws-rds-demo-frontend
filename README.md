# Student CRUD Frontend

This is the **frontend** for the Student CRUD application, built using **React**.  
It connects to the backend API (hosted on AWS Lambda + API Gateway + RDS Postgres) to perform **Create, Read, Update, Delete** operations for student data.

[This is the backend repo] (https://github.com/algobrewery/student-aws-rds-demo-backend/)


## 🌐 Live Demo

[Student CRUD Demo](http://student-crud-demo-frontend.s3-website-ap-southeast-2.amazonaws.com/)  
*Note: Right-click → Open in new tab to open the app in a separate browser tab.*

---

## 🛠 Features

- List all students
- Add new student
- Update existing student
- Delete student
- Responsive UI


#github CI/CD
//this is a demo pipeline and can be added to the repo root as .github/workflows/deploy-frontend.yml 

name: Deploy Frontend to S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Checkout code
      - name: Checkout code
        uses: actions/checkout@v3

      # Step 2: Set up Node.js
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm install

      # Step 4: Build React app
      - name: Build
        run: npm run build

      # Step 5: Deploy to S3
      - name: Deploy to S3
        uses: aws-actions/aws-cli@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-southeast-2
          args: s3 sync build/ s3://student-crud-demo-frontend --delete

