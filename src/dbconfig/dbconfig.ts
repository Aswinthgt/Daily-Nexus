import mongoose from "mongoose";

export default async function connectDb() {
    try {

        mongoose.connect(process.env.MONGODB!, { dbName: process.env.DB_NAME })
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });


        const db = mongoose.connection;


        db.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        db.on('error', (error) => {
            console.error('Mongoose connection error:', error);
        });

        db.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });

    } catch (er) {
        console.log(er)
    }
}

