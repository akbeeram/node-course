const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks')
const port = process.env.PORT || 5588;
require('dotenv').config();
//middleware
const errorHandlerMiddleware = require('./middleware/error-handler')
app.use(express.static('./public'))
app.use(express.json());

//404s
const notFound = (req, res) => {
    res.status(404).send('Route Not Found')
}

app.use('/api/v1/tasks', taskRoutes);

app.use(notFound)
app.use(errorHandlerMiddleware);

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connectd to DB')
        app.listen(port, () => {
            console.log(`Server is listening on ${port}`);
        });
    } catch(err) {
        console.log('error connecting to DB')
    }
}

start()