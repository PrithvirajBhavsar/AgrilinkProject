# AgrilinkProject
required pre installed node.js and postman
1. clone project directory from github link.
2. open terminal at the project directory.
3. run npm install to install dependencies.
4. run npm start to start the project.
5. There are two methods in project first is post and second is get.
6. make post request from postman to /reports with body.
7. sample body for report 
  {
    "userID":"1234570",
    "marketID":"4453234",
    "marketName":"Surat mandi",
    "cmdtyID":"Hello",
    "cmdtyName":"Tomato",
    "priceUnit":"Quintal",
    "convFctr":"15.25",
    "price":"1500"
}
9. make get request from postman to /reports with search params id.
10. you can also run npm run test to run the test.
