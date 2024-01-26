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
// Get API endpoint: fetches from the database the post defined by the id provided
router.get('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const result = yield db_1.default.query('SELECT * FROM blogs_table WHERE blog_id = $1', [postId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const post = result.rows[0];
        console.log('Post retrieved from the database:', post);
        res.json(post);
    }
    catch (error) {
        console.error('Error retrieving post from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
