
const express = require('express');
const xxx = express.Router();

xxx.get('/h1', (req, res) => {
    res.send('Hello from Helper!');
  });

//The actual API method Responding by hello text
xxx.get('/h2', (req, res) => {
    res.send('Hello from Helper!!');
});
  
//Getting Path parameter, also
xxx.get('/h3/:friend', (req, res) => {
    let f=req.params['friend'];
    res.send('Hello from Helper, '+f+'!!!');
});

let makeTheJob=(req, res) => {
    let f=req.params['friend'];
    res.send('Hello from Helper, '+f+'!!!!');
};

xxx.get('/h4/:friend', makeTheJob);

module.exports=xxx;


// Listen to the App Engine-specified port, or 8080 otherwise
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}...`);
// });  