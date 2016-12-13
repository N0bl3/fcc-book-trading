const bcrypt   = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    banned     : {
        type   : Boolean,
        default: false
    },
    admin      : {
        type   : Boolean,
        default: false
    },
    local      : {
        username: {
            type    : String,
            required: true,
            unique  : true
        },
        password: {
            type    : String,
            required: true
        },
        city    : String,
        state   : String
    },
    facebook   : {
        id   : String,
        token: String,
        email: String,
        name : String
    },
    google     : {
        id   : String,
        token: String,
        email: String,
        name : String
    },
    wanted     : {
        type: [Schema.Types.ObjectId],
        ref : 'Book'
    },
    created_at : {
        type   : Date,
        default: Date.now()
    },
    modified_at: {
        type   : Date,
        default: Date.now()
    },
    demands    : [{}]
});

userSchema.pre('save', function(next){
    this.modified_at = Date.now();
    next();
});

userSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
