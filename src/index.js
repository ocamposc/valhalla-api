const express  = require ('express');
const morgan = require('morgan');
const axeRoute = require('./routes/axe');
const vikingRoute = require('./routes/viking');

const app = express();

const port = 4000;
app.set('json spaces', 2);

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/viking', vikingRoute);
app.use('/api/axe', axeRoute);

app.listen(port, () => console.log(`Server running at port: ${port}`));