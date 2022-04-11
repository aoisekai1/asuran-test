const mongoose = require('mongoose');

module.exports = async () =>  {
    console.log();
    mongoose.connect(process.env.DATABASE_SERVER, {
        useNewUrlParser: true , 
        useUnifiedTopology: true
    });

    
    const db = mongoose.connection;

    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('Database connected'));
    // return mongoose;
}