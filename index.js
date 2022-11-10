const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const reviewCollection = client.db('photographer').collection('reviews');
        
        app.get('/services', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        }),
        
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        // reviwe api 

        app.get('/reviews', async(req, res) => {
            let query = {};
            if(req.query.email){
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })

        app.post('/reviews', async(req, res) => {
            const review = req.body;
            const result = reviewCollection.insertOne(review);
            res.send(result)
        });
        
        app.delete('/reviews/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
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