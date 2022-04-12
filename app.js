require('dotenv').config();
const express = require('express');
var cors = require('cors');
const mongoDB = require('./config/database/db');
const app = express();

app.use(cors());
app.use(express.json());

//Connection  MongoDB
mongoDB();

//ROUTES
const Role = require('./controllers/Role');
const Admin = require('./controllers/Admin');
const Customer = require('./controllers/Customer');
const Okupasi = require('./controllers/Okupasi');
const Konstruksi = require('./controllers/Konstruksi');
const Claim = require('./controllers/Claim');
const Products = require('./controllers/Products');
const Privillage = require('./controllers/Privillage');
const PrivillageUser = require('./controllers/PrivillageUser');
const db = require('./config/database/db');

app.use('/products', Products);
app.use('/claim', Claim);
app.use('/role', Role);
app.use('/admin', Admin);
app.use('/customer', Customer);
app.use('/okupasi', Okupasi);
app.use('/konstruksi', Konstruksi);
app.use('/privillage', Privillage);
app.use('/privillage/user', PrivillageUser);

app.listen(3001, () => console.log('Server started'));