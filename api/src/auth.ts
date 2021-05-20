
export const isLoggedIn = (req: any) => !!req.session.userId

export const logIn = (req: any, userId: string) => {
    req.session.userId = userId
}