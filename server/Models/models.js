const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: '65020df807624f7a95321280'
})
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error('MongoDB Error: ', err))


const profileSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: String, required: true},
    bio: {type: String, required: true},
    artists: {type: Array, required: true},
    images: {type: Object, required: false}
})

profileSchema.pre('save', function(next) {
        
        const newProfile = this;

        try {
            bcrypt.hash(newProfile.password, 10, function(err, hash) {
                newProfile.password = hash;
                return next();
            })
        }

        catch(err) {
            return next({
                log: `Error at models.js/profileSchema.pre('save'): unknown error in bcrypt.hash try/catch block.`,
                status: 500,
                message: { err: `Unknown error at signup.` }
            });
        }
        
});

profileSchema.methods.bcryptVerify = async function(inputPassword, controllerCallback) {
    const thisProfile = this;
        
    bcrypt.compare(inputPassword, thisProfile.password, function(err, verified) {
        if (err) return controllerCallback(err);
        else return controllerCallback(null, verified);
    });
};

module.exports = mongoose.model('Profile', profileSchema);