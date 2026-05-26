"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./config/data-source");
const port = Number(process.env.PORT ?? 3000);
data_source_1.AppDataSource.initialize()
    .then(() => {
    app_1.default.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map