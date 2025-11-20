import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URL)
        .then((conn) => {
            console.log("Connected");
            console.log("DB Name:", conn.connection.name);
            console.log("Host:", conn.connection.host || conn.connection.client.s.options.hosts);
        })
        .catch(err => console.error(err));
}

export default connectDB