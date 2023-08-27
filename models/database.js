const mongoose = require('mongoose');
const crypto = require("crypto");
mongoose.set('strictQuery', true);

const connection = "mongodb+srv://carmelbar:yb6calpzkTW88yQC@cluster1.2yfkirw.mongodb.net/Budget?retryWrites=true&w=majority";
mongoose.connect(connection, { useNewUrlParser: true });
const db = mongoose.connection;
// Logging any errors that occur when connecting to the database.
db.on('error', (error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});
// Logging a success message once the connection is established.
db.once('open', () => {
    console.log('Successfully connected to MongoDB Atlas.');
});

enumCategory=[
    'food',
    'housing',
    'health',
    'sport',
    'education',
    'transportation',
    'other',]

// Creating schemas
const usersSchema= new mongoose.Schema(
    {
        id:String,
        username: String,
        password:String,
    },
    {versionKey: false}
);

const budgetSchema= new mongoose.Schema({
        user_id:{
            type:Number,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            enum:enumCategory,
            required:true,
        },
        sum:{
            type:Number,
            required:true,
        }},
    {versionKey: false}
);

const User=mongoose.model('User',usersSchema);
const Budget=mongoose.model('Budget',budgetSchema);

module.exports={User,Budget};