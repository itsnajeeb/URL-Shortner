import express from "express"
import {  deleteUrl, getAllLinks, shortUrl, viewDetails } from "../controllers/shortUrl.controller.js"
const router = express.Router()

router.post("/", shortUrl)
router.get("/", getAllLinks)
router.get("/:code", viewDetails)
router.delete("/:code", deleteUrl)

export default router