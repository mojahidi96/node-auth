import express from 'express'
import session, { Store } from 'express-session'
import { SESSION_OPTIONS } from './config/index'
import { active, catchAsync, internalServerError, notFound } from './middleware'
import { home, login, register } from './routes'

export const createApp = (store: Store) => {
    const app = express()
    app.use(express.json())
    app.use(session({
        ...SESSION_OPTIONS,
        store
    }))

    app.use(catchAsync(active))

    app.use(home)

    app.use(login)

    app.use(register)

    app.use(notFound)

    app.use(internalServerError)

    return app

}


