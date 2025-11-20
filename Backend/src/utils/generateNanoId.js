import { nanoid } from "nanoid";

export const generateNanoId =  () => {
    const nanoId =  nanoid(7)
    return nanoId
}