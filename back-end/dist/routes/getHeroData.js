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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../utils/db"));
const router = express_1.default.Router();
// GET API endpoint: fetches information related to home page's hero section, comments and users' numbers are just placeholders
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT count(*) AS exact_count FROM blogs_table");
        const threadNumber = Number(result.rows[0].exact_count);
        const commentNumber = 37;
        const userNumber = 43;
        console.log('Threads, comments and users retrieved:', threadNumber);
        res.json({ threads: threadNumber, comments: commentNumber, users: userNumber });
    }
    catch (error) {
        console.error('Error retrieving data from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
