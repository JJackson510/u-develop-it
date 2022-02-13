const express = require("express");
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes/index');


const port = process.env.PORT ||3001;
const app = express();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', apiRoutes);

// defaults response for any other request(Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');

    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    })
});
