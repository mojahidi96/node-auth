import { Request, Response, Router } from 'express'
import { auth, catchAsync } from '../middleware'
import { User } from '../model'

const router = Router()

router.get('/home', auth, catchAsync(async (req: any, res: Response) => {
    const user = await User.findById(req.session.userId)
    res.json(user)
}))

export default router