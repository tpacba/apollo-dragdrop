const shortid = require('shortid');
const { createWriteStream, mkdir } = require('fs');

const File = require('../models/fileModel');

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
        async uploadFile(_, { file, post}) {
            mkdir("images", { recursive: true }, (error) => {
                if (error) {
                    throw error;
                }
            })
            const upload = await processUpload(file, post);
            await File.create(upload);
            return upload;
        }
    }
}

module.exports = resolvers;