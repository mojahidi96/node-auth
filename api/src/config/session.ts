import { SessionOptions } from "express-session"
import { IN_PROD } from "./app"
import { ONE_HOUR } from "./auth";

const HALF_HOUR = ONE_HOUR / 2

const SIX_HOURS = ONE_HOUR * 6

const { env } = process;

export const {
    SESSION_SECRET = 'Please keep this secret',
    SESSION_NAME = 'sid',
    SESSION_IDLE_TIMEOUT = HALF_HOUR
} = env

export const SESSION_ABSOLUTE_TIMEOUT = +(env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS)

export const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    resave: false,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true
    },
    rolling: true,
    saveUninitialized: false
}