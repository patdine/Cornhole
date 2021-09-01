const { request, response } = require('express');
const express = require('express');
const Datastore = require('nedb');
const app = express();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    return console.log("Listening at port ${PORT}");
});
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/post', (request, response) => {
    console.log("I got a post request");
    const data = request.body;
    database.remove({}, { multi: true }, function (err, numRemoved) {
    });
    database.insert(data);
    response.json({
        status: 'success!'
    });
});

app.get('/get', (request, response) => {
    console.log("I got a get request");
    database.find({}, { teams: 1, results: 1, _id: 0 }, function (err, data) {
        if(err) {
            response.end();
            return;
        }
        response.json({
            body: data[0]
        });
    });
});