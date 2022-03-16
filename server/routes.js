import {logger} from "./util.js";
import config from "./config.js";
import {Controller} from "./controller.js";

const {
    location,
    pages: {
        homeHTML,
        controllerHtml
    },
    constants: {
        CONTENT_TYPE
    }
} = config
const controller = new Controller()

async function routes(request, response) {
    const {method, url} = request

    if (method === 'GET' && url === '/') {
        response.writeHead(302, {
            'Location': location.home
        })

        return response.end()
    }

    if (method === 'GET' && url === '/home') {
        const {
            stream,
            type
        } = await controller.getFileStream(homeHTML)

        const contentType = CONTENT_TYPE[type];

        if (contentType) {
            setHeaderResponse(200, contentType, response)
        }

        return stream.pipe(response)
    }

    if (method === 'GET' && url === '/controller') {
        const {
            stream,
            type
        } = await controller.getFileStream(controllerHtml)

        const contentType = CONTENT_TYPE[type];

        if (contentType) {
            setHeaderResponse(200, contentType, response)
        }

        return stream.pipe(response)
    }

    if (method === 'GET') {
        const {
            stream,
            type
        } = await controller.getFileStream(url)

        const contentType = CONTENT_TYPE[type];

        if (contentType) {
            setHeaderResponse(200, contentType, response)
        }

        return stream.pipe(response);
    }

    response.writeHead(404)
    return response.end()
}

function handleError(error, response) {
    if (error.message.includes('ENOENT')) {
        logger.warn(`Asset not fount ${error.stack}`)
        response.writeHead(404)
        return response.end()
    }

    logger.error(`caught error on API ${error.stack}`)
    response.writeHead(500)
    return response.end()
}

function setHeaderResponse(status, contentType, response) {
    response.writeHead(status, {
        'Content-Type': contentType
    })
}

export function handler(request, response) {
    return routes(request, response).catch(error => handleError(error, response))
}
