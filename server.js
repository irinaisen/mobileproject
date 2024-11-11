
const path = require(`path`);
const express = require('express');
const app = express();
app.use(express.json());



    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // This middleware is available in Express v4.16.0 onwards
    app.use(express.urlencoded({extended: true}));
    
    
    // var MongoClient = require('mongodb').MongoClient;
    const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
     var uri="mongodb+srv://irina20103:VRTrains@cluster0.muup47x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    
    const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );
    


    //URI to static files in folder 'views' is 'html'
    //e.g. http://some.server.sw/html/form.html points to file form.html in views folder
    app.use("/html", express.static('views'));
    
    //Responding by "Root of the app!" - this is the root of the app
    app.get('/', (req, res) => {
      res.send("Root of the app!");
    });
    
    //Responding by hello text - actually for debugging
    app.get('/sayHello', (req, res) => {
      res.send("Hello from App Engine!");
    });
    
    //Responding by opening file /views/form.html
    app.get('/submit', (req, res) => {
      res.sendFile(path.join(__dirname, '/views/form.html'));
    });
    
    //Responding by returnig the data added into html form. Here name and message should
    //be the names of the html form fields
    app.post('/submit', (req, res) => {
        console.log("Tadaa");
        let comment=({
          name: req.body.name,
          message: req.body.message,
        });
        addOneComment(comment).then(()=>readallComment().then(z=>res.send(z)));
        res.send('Kiitos viestistäsi '+req.body.name);
    });



    
    //This is debugging function
    //A JSON string is sent from an html form and sent by AJAX as JSON string
    //This method returns the modified object
    app.post('/addweather', (req, res) => {
        console.log("Tadaa");
        let weather=req.body;
        weather.place="Muokattu "+weather.place;
        weather.date=8900;
        weather.weathernow=120;
        console.log({
          name: req.body
        });
        res.send(weather);
    });
    
    app.post('/addoneweather', (req, res) => {
        console.log("Tadaa");
        let weather=req.body;
        addOneWeather(weather).then(()=>readall().then(z=>res.send(z)));
    });
    
    
    app.put('/updateoneweather', (req, res) => {
        console.log("Tadaa update");
        let weather=req.body;
        updateOneWeather(weather).then(()=>readall().then(z=>res.send(z)));
    });
    
    app.get('/getallweather', (req, res) => {
        readall().then(z=>res.send(z));
    });

    app.get('/getallweather', (req, res) => {
      //   readall().then(z=>res.send(z));
      res.send('Helsinki 11.11.2024. Pilvistä, sateista.');
     });
    
    app.delete('/deleteoneweather/:id', (req, res) => {
        const id=req.params['id'];
        console.log("id="+id);
        deleteOneWeather(id).then(ok=>
            {
                console.log("deleten jälkeen ok="+ok);
                if (ok){
                    readall().then(z=>{res.status(200).send(z);});
                }
                else{
                    res.status(313).send("Ei poistettavaa!");
                }
            }
        );
        console.log("deleted");
    });

    async function addOneComment(comment) {
        console.log("addOneComment started");
        try {
          // Connect the client to the server (optional starting in v4.7)
          await client.connect();
          await client.db("trains").collection("comment").insertOne(comment);
        }
        catch(e){
            console.log("Lisäyspoikkeus");
        } 
        //finally is run ALWAYS - even if there is a return before
        finally {
          await client.close();
        }
    }
    
    
    async function addOneWeather(weather) {
        console.log("addOneWeather started");
        try {
          // Connect the client to the server (optional starting in v4.7)
          await client.connect();
          await client.db("trains").collection("VRtrains").insertOne(weather);
        }
        catch(e){
            console.log("Lisäyspoikkeus");
        } 
        //finally is run ALWAYS - even if there is a return before
        finally {
          await client.close();
        }
    }

    async function readallComment() {
        console.log("readallcomment started");
        const options = {
            // Sort returned documents in ascending order by weight
            sort: { _id: 1 },
            // Include all the fields into the result
            projection: { _id: 1, comment: 1},
          };    
        try {
        let arr=new Array();
          await client.connect();
          result=client.db("trains").collection("comment").find({}, options);
       
          for await (const doc of result) {
            console.log(doc._id);//Debugging
            arr.push(doc);
          }
          return arr;
        }
        catch(e){
            console.log("Poikkeus");
        } 
        //finally is run ALWAYS - even if there is a return before
        finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
    }
    async function updateOneWeather(weather) {
        console.log("updateOneWeather started");
        console.log("Weather id="+weather._id);
        try {
            var filter = {"_id": new ObjectId(""+weather._id)};
            var update={ $set: {place: weather.place, date: weather.date, weathernow: weather.weathernow } };
          // Connect the client to the server (optional starting in v4.7)
            await client.connect();
            await client.db("trains").collection("VRtrains").updateOne(filter,update);
        }
        catch(e){
            console.log("Päivityspoikkeus");
        } 
        //finally is run ALWAYS - even if there is a return before
        finally {
          await client.close();
        }
    }
 
    async function readall() {
        console.log("readall started");
        const options = {
            // Sort returned documents in ascending order by weight
            sort: { date: 1 },
            // Include all the fields into the result
            projection: { _id: 1, place: 1, date: 1, weathernow:1},
          };    
        try {
        let arr=new Array();
          await client.connect();
          result=client.db("trains").collection("VRtrains").find({}, options);
       
          for await (const doc of result) {
            console.log(doc._id);//Debugging
            arr.push(doc);
          }
          return arr;
        }
        catch(e){
            console.log("Poikkeus");
        } 
        //finally is run ALWAYS - even if there is a return before
        finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
    }
    async function deleteOneWeather(id) {
        console.log("deleteOneWeather started");
        let ok=false;
        try {
          var deletequery = {"_id": new ObjectId(""+id)};
          // Connect the client to the server (optional starting in v4.7)
          await client.connect();
          ok=await client.db("trains").collection("VRtrains").deleteOne(deletequery).
          then(result=>{
            return result.deletedCount==1;
          });
          console.log("ok="+ok);
        }
        catch(e){
            console.log("Poistopoikkeus");
        } 
        //finally is run ALWAYS - even if there is a return before
        finally {
          await client.close();
        }
        console.log("deleteOneWeather ended");
        console.log("lopussa ok="+ok);
        return ok;
    }




// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
