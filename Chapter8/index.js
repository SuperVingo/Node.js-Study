const mongoose = require('monegoose');

const connect = () => {
    if(process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    mongoose.connect('mongodb://user:1234@localhost:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if(error) {
            console.log('몽고 연결 에러', error);
        } else {
            console.log('연결 성공');
        }
    });
};
mongoose.connection.on('error', (error) => {
    console.error('몽고 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고 연결 끊김, 재시도중');
    connect();
});

module.exports = connect;