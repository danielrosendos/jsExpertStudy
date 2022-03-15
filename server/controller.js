import { Service } from "./service.js";

export class Controller {
    constructor() {
        this.service = new Service()
    }

    /**
     *
     * @param filename
     * @returns {Promise<{stream: void, type: *}>}
     */
    async getFileStream(filename) {
        return this.service.getFileStream(filename)
    }
}
