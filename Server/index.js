import express from 'express';
import movieData from './routes/movieData.js';

const app = express();

app.use('/api', movieData);

app.listen(3000, () => {
    console.log('Listening on port 3000');
    }
);


