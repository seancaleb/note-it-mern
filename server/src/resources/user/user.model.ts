import { Schema, model } from 'mongoose';
import { UserDocument } from '@/resources/user/user.interface';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<UserDocument>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            select: false,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true }
);

UserSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified()) return next();

    if (this.password.startsWith('@admin')) this.role = 'admin';

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

UserSchema.pre<UserDocument>('findOneAndUpdate', async function (next) {
    const user: any = this;

    if (user._update.password) {
        user._update.password.startsWith('@admin')
            ? (user._update.role = 'admin')
            : (user._update.role = 'user');

        const hash = await bcrypt.hash(user._update.password, 10);
        user._update.password = hash;
        next();
    }

    next();
});

UserSchema.methods.isValidPassword = async function (
    this: UserDocument,
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
});

export default model<UserDocument>('User', UserSchema);
