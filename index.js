import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
import productRouter from './router/product.js';
import commentRouter from './router/comment.js';

dotenv.config();


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '30mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', productRouter);
app.use('/', commentRouter);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database is connected!!');
    })
    .catch((err) => {
        console.log('err: ' + err);
    })

app.listen(PORT, () => {
    console.log('Sever is running on port ' + 8080);
})