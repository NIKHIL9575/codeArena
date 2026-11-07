const mongoose=require('mongoose');

async function Mongodb(url){
    return mongoose.connect(url);
}

module.exports={
    Mongodb,
};