import mongose from 'mongoose'

const userSchema = new mongose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    cartData: { type: Object, default: {} },
}, { minimize: false })

// const userModel = mongose.model.user || mongose.model('user', userSchema)
const userModel = mongose.model('user', userSchema)
export default userModel