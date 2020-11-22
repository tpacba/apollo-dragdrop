const shortid = require('shortid');
const { createWriteStream, mkdir } = require('fs');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const File = require('../models/fileModel');
const User = require('../models/userModel');

const { validateLoginInput, validateRegisterInput } = require('../utils/validators');

const { UserInputError } = require('apollo-server');

async function storeUpload({ stream, filename, mimetype }) {
    const id = shortid.generate();
    const path = `images/${id}-${filename}`;

    return new Promise((resolve, reject) => {
        stream
            .pipe(createWriteStream(path))
            .on("finish", () => resolve({ id, path, filename, mimetype }))
            .on("error", reject)
    });
};

async function processUpload(upload, post) {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    file.post = post;
    file.createdAt = new Date().toISOString();
    return file;
};

const resolvers = {
    Query: {
        async sayHello() {
            try {
                return "Hello world!"
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        async uploadFile(_, { file, post }) {
            mkdir("images", { recursive: true }, (error) => {
                if (error) {
                    throw error;
                }
            })
            const upload = await processUpload(file, post);
            await File.create(upload);
            return upload;
        },
        async register(_, { registerInput: { username, password, confirmPassword, email } }) {
            const { errors, valid } = validateRegisterInput(username, password, confirmPassword, email);
            if (!valid) {
                throw new UserInputError("Errors detected", { errors });
            }

            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("This username is taken.", {
                    errors: {
                        username: "This username is taken."
                    }
                })
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            })

            const response = await newUser.save();

            const token = jwt.sign(
                { id: user.id, email: user.email, username: user.username },
                SECRET_KEY,
                { expiresIn: "1h" }
            )

            return {
                ...response._doc,
                id: response._id,
                token
            }
        }
    }
}

module.exports = resolvers;