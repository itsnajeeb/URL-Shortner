import shortUrlSchema from "../models/shortUrl.model.js"
import { NotFoundError } from "../utils/errorHandler.js";

export const createShortURL = async (url, code) => {
    // Saving URL to DB
    const newShortUrl = await shortUrlSchema.create({
        original_url: url,
        short_code: code
    });
    return newShortUrl
}


export const validateURL = (url) => {
    let validUrlPattern = /^(http|https):\/\/[^ "]+$/;
    if (!validUrlPattern.test(url)) {
        return null;
    }
    return url
}

export const validateCustomeCode = async (customCode) => {

    //  if user provide custom code then check code is already exist...?
    const isExist = await shortUrlSchema.findOne({ short_code: customCode });

    if (isExist) {
        return null
    }
    return customCode;
}

export const redirectToOriginalUrlServices = async (id) => {
    const url = await shortUrlSchema.findOneAndUpdate({ short_code: id },
        {
            $inc: { clicks: 1 },
            $set: { lastClickedAt: new Date() }
        },
        { new: true }
    )
    return url

}
