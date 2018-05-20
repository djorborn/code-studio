import router from './routes/router';
import config from './config';
import express from 'express';

const app = express();

config(app);

app.set('view engine', 'pug');

app.use(
    express.json(),
    express.urlencoded({extended: false}),
    express.static(process.cwd() + '/client/public')
);

router(app);
/*eslint-disable*/
app.listen(8080, () => console.log('Server is Go!'));
