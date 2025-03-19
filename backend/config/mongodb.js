import mongose from 'mongoose'

export default async function connectDB() {
    mongose.connection.on('connected', () => {
        console.log('DB Connected')
    })
    await mongose.connect(`${process.env.MONGODB_URL}/e-commerse`)
}