"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../src/index"));
const request = (0, supertest_1.default)(index_1.default);
let server;
describe('GET /get-hero-data', () => {
    beforeAll(() => {
        console.log('Before All - Server Starting');
        server = index_1.default.listen(3003);
    });
    it('should return a list containing the information used by the hero section', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/get-hero-data');
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
    }));
    afterAll((done) => {
        if (server) {
            server.close(done);
        }
    });
});
