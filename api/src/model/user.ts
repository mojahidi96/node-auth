import { compare, hash } from "bcryptjs"
import { createHash, createHmac, timingSafeEqual } from "crypto"
import { model, Schema, Document, Model } from "mongoose"
import { APP_ORIGIN, APP_SECRET, BCRYPT_WORK_FACTOR, EMAIL_VERIFICATION_TIMEOUT } from "../config"

export interface UserDocument extends Document {
    email: string,
    name: string,
    password: string,
    verifiedAt: Date,
    validatePassword: (password: string) => Promise<boolean>,
    verificationUrl: () => string,
}

interface UserModel extends Model<UserDocument> {
    signVerificationUrl: (url: string) => string,
    hasValidVerificationUrl: (path: string, query: any) => boolean
}

const userSchema = new Schema({
    email: String,
    name: String,
    password: String,
    verifiedAt: Date
}, {
    timestamps: true
})

userSchema.pre<UserDocument>('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
    }
})

userSchema.methods.validatePassword = function (password: string) {
    return compare(password, this.password);
};

userSchema.methods.verificationUrl = function () {
    const token = createHash('sha1').update(this.email).digest('hex')
    const expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT

    const url = `${APP_ORIGIN}/email/verify?id=${this.id}&token=${token}&expires=${expires}`
    const signature = User.signVerificationUrl(url)

    return `${url}&signature=${signature}`
}


userSchema.statics.signVerificationUrl = (url: string) =>
    createHmac('sha256', APP_SECRET).update(url).digest('hex')

userSchema.statics.hasValidVerificationUrl = (path: string, query: any) => {
    const url = `${APP_ORIGIN}${path}`
    const original = url.slice(0, url.lastIndexOf('&'))
    const signature = User.signVerificationUrl(original)

    return timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) && +query.expires > Date.now()
}

userSchema.set('toJSON', {
    transform: (dot, { __v, password, ...rest }, options) => rest
})

export const User = model<UserDocument>('User', userSchema)