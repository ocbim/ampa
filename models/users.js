const mongoose = require('../config/db');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-node');

/**
 * @author Oscar Calvo Batista
 * 
 */
let userSchema = new Schema({
	nombre: { type: String, lowercase: true },
	apellidos: { type: String, lowercase: true },
	email: { type: String, unique: true, required: true, lowercase: true },
	password: { type: String},
	role: { type: String, default: 'invitado' }
}, { versionKey: false, timestamps: true });



userSchema.pre('save', function (next) {
	
	if (!this.isModified('password')) return next();

	bcrypt.genSalt(4, (err, salt)=>{
		if (err){ return next(err);}
		console.log(`Esta es la salt ${salt}`);
		bcrypt.hash(this.password, salt,null, (err, hash)=>{
			if (err){ return next(err);}
			this.password = hash
		});
	});
	next();
});

userSchema.methods.compararPassword = function (password, cb) {

	bcrypt.compare(password, this.password, (err, sonIguales) => {
		if (err) {
			cb(err);
		}
		cb(sonIguales);
	});
};


module.exports = mongoose.model('usuariosAdmin', userSchema);