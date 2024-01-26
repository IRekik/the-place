"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const getAllPosts_1 = __importDefault(require("./routes/getAllPosts"));
const editPost_1 = __importDefault(require("./routes/editPost"));
const deletePost_1 = __importDefault(require("./routes/deletePost"));
const getPostById_1 = __importDefault(require("./routes/getPostById"));
const submitData_1 = __importDefault(require("./routes/submitData"));
const getHeroData_1 = __importDefault(require("./routes/getHeroData"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use('/get-all-posts', getAllPosts_1.default);
app.use('/edit-post', editPost_1.default);
app.use('/delete-post', deletePost_1.default);
app.use('/get-post-by-id', getPostById_1.default);
app.use('/submit-data', submitData_1.default);
app.use('/get-hero-data', getHeroData_1.default);
const httpServer = http_1.default.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
