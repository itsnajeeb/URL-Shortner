import mongoose from 'mongoose'

const shortUrlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_code: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    lastClickedAt: {
        type: Date,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const shortUrl = mongoose.model("shortUrl", shortUrlSchema)

export default shortUrl

