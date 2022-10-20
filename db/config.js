const moongose = require('mongoose');



const dbConnection = () => {



    moongose.connect(process.env.BD_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Base de datos conectada correctamente.'))
        .catch(err => console.log(err));

}


module.exports = {

    dbConnection

}