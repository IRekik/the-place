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
// Edit API endpoint: update the database using a new title, text content of a given post id, while logging edit date
router.post('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, text_content } = req.body;
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const edit_date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    try {
        const postId = req.params.postId;
        const result = yield db_1.default.query('UPDATE blogs_table SET title = $2, content = $3, edit_date = $4 WHERE blog_id = $1', [postId, title, text_content, edit_date]);
        console.log('Data edited in the database:', result.rows[0]);
        res.json({ message: 'Data received and inserted successfully' });
    }
    catch (error) {
        console.error('Error editing data in the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
