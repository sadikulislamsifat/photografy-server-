const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middle wares
app.use(cors());
app.use(express.json());


const blogItems = require('./blog.json')




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.osccaca.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('photographer').collection('services');
        
        app.get('/services', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })
    }
    finally{

    }

}
run().catch(e => console.error(e))



app.get('/', (req, res) => {
    res.send('photographer server running')
});

app.listen(port, () => {
    console.log("photographer running on port",)
});

app.get('/blog', (req, res) => {
    res.send(blogItems)
});