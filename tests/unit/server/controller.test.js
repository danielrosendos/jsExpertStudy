import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from "@jest/globals";
import TestUtil from "../_util/testUtil.js";
import {Service} from "../../../server/service.js";
import {Controller} from "../../../server/controller.js";

describe('#Controller - test suite for controller calls', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('#getFileStream Controller', async () => {
        const mockStream = TestUtil.generateReadableStream(['test'])
        const mockType = '.html'
        const mockFileName = 'test.html'

        jest.spyOn(
            Service.prototype,
            Service.prototype.getFileStream.name
        ).mockResolvedValue({
            stream: mockStream,
            type: mockType
        })

        const controller = new Controller()
        const {
            stream,
            type
        } = await controller.getFileStream(mockFileName)

        expect(stream).toStrictEqual(mockStream)
        expect(type).toStrictEqual(type)
    })
})
