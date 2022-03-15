import fs from 'fs'
import fsPromises from 'fs/promises'

import config from "./config.js";
import { join, extname } from 'path'

const {
    dir: {
        publicDirectory
    }
} = config;

export class Service {

    /**
     *
     * @param filename
     * @returns {*}
     */
    createFileStream(filename) {
        return fs.createReadStream(filename)
    }

    /**
     *
     * @param filename
     * @returns {Promise<{name: *, type: *}>}
     */
    async getFileInfo(filename) {
        const fullFilePath = join(publicDirectory, filename)
        // valida se existe, se não existe estoura erro!!
        await fsPromises.access(fullFilePath)
        const fileType = extname(fullFilePath)

        return {
            type: fileType,
            name: fullFilePath
        }
    }

    /**
     *
     * @param filename
     * @returns {Promise<{stream: void, type: *}>}
     */
    async getFileStream(filename) {
        const {
            name,
            type
        } = await this.getFileInfo(filename)

        return {
            stream: this.createFileStream(name),
            type
        }
    }
}
