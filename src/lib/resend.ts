import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY as string)

export const REPLY_TO = "romainblanchot0@gmail.com"
