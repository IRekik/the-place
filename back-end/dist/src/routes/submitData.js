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
const cloudinaryIntegration_1 = __importDefault(require("../utils/cloudinaryIntegration"));
const db_1 = __importDefault(require("../utils/db"));
const router = express_1.default.Router();
// Post API endpoint: inserts post's attributes inside the database
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, text_content, img_reference } = req.body;
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        const creation_date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        let query;
        let params;
        // Conditional for database insertion, depending whether an image has been provided or not
        if (img_reference) {
            const img_link = yield (0, cloudinaryIntegration_1.default)(img_reference);
            query = 'INSERT INTO blogs_table (title, content, creation_date, img_reference) VALUES ($1, $2, $3, $4) RETURNING *';
            params = [title, text_content, creation_date, img_link];
        }
        else {
            query = 'INSERT INTO blogs_table (title, content, creation_date) VALUES ($1, $2, $3) RETURNING *';
            params = [title, text_content, creation_date];
        }
        const result = yield db_1.default.query(query, params);
        console.log('Data inserted into the database:', result.rows[0]);
        res.json({ message: 'Data received and inserted successfully', blog_id: result.rows[0].blog_id });
        console.log(res);
    }
    catch (error) {
        console.error('Error inserting data into the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
