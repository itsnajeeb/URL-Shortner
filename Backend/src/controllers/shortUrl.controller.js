import { createShortURL, redirectToOriginalUrlServices, validateCustomeCode, validateURL } from "../services/shortUrl.services.js";
import shortUrlSchema from "../models/shortUrl.model.js"
import { BadRequestError, NotFoundError } from "../utils/errorHandler.js";
import { generateNanoId } from "../utils/generateNanoId.js";

//Creating Shourt URL 
export const shortUrl = async (req, res, next) => {
    try {
        const { url, customCode } = req.body;

        // check URL Provide or NOT
        if (!url) throw new BadRequestError("URL is required");

        // checking URL Validation
        let urlValidation = validateURL(url)
        if (!urlValidation) return res.status(400).json({ message: "Your URL Not Valid" });

        //Checking code uniquness
        let code = customCode ? await validateCustomeCode(customCode) : generateNanoId(7);
        if (!code) return res.status(400).json({ message: "custom code already exists" });

        let shortedData = await createShortURL(url, code)

        // Response
        return res.status(200).json({
            message: "URL shortened successfully",
            data: shortedData,
            shortUrl: process.env.VITE_LOCALHOST_URL + "/api" + shortedData.short_code,
        });
    } catch (err) {
        next(err)// Pass error to your centralized error handler
    }
}

//Redirect to Original Path
export const redirectToOriginalUrl = async (req, res, next) => {
    try {
        let { id } = req.params;
        if (id.startsWith(":")) id = id.slice(1);

        let redirectionCode = await redirectToOriginalUrlServices(id)

        //return original URL for Redirection
        if (!redirectionCode) throw new NotFoundError("URL Not Exist");

        return res.status(302).redirect(redirectionCode.original_url)
    } catch (err) {
        next(err)// Pass error to your centralized error handler
    }
}

//Delete Url
export const deleteUrl = async (req, res) => {
    try {
        let { code } = req.params;
        if (code.startsWith(":")) code = code.slice(1);

        if (!code) {
            return res.status(400).json({ message: "ID is required" })
        }
        //
        let deleteData = await shortUrlSchema.findOneAndDelete({ short_code: code });
        if (!deleteData) {
            throw new NotFoundError("Link are no longer for redirection")
        }

        return res.status(200).json({
            message: "URL Deleted Successfully",
            deleteData
        })
    } catch (err) {
        next(err) // Pass error to your centralized error handler
    }
}

//View details of single link 
export const viewDetails = async (req, res, next) => {
    try {
        let { code } = req.params;
        if (code.startsWith(":")) code = code.slice(1);
        if (!code) {
            throw new BadRequestError("Short Code is required ");
        }
        let data = await shortUrlSchema.find({ short_code: code })

        if (data.length === 0) {
            throw new NotFoundError("Data nou found by provide code")
        }
        return res.status(200).json({
            data
        })
    } catch (err) {
        next(err); // Pass error to your centralized error handler

    }
}

//get all links
export const getAllLinks = async (req, res, next) => {
    try {
        const data = await shortUrlSchema.find();

        if (!data || data.length === 0) {
            throw new NotFoundError("No links found");
        }

        return res.status(200).json({
            success: true,
            count: data.length,
            data
        });
    } catch (err) {
        next(err); // Pass error to your centralized error handler
    }
};
