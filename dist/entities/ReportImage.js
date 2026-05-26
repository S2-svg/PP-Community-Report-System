"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportImage = void 0;
const typeorm_1 = require("typeorm");
const Report_1 = require("./Report");
let ReportImage = class ReportImage {
};
exports.ReportImage = ReportImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "image_id" }),
    __metadata("design:type", Number)
], ReportImage.prototype, "imageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "report_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], ReportImage.prototype, "reportId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image_url", type: "text", nullable: true }),
    __metadata("design:type", Object)
], ReportImage.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "uploaded_at", type: "timestamp" }),
    __metadata("design:type", Date)
], ReportImage.prototype, "uploadedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Report_1.Report, (report) => report.images, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "report_id" }),
    __metadata("design:type", Object)
], ReportImage.prototype, "report", void 0);
exports.ReportImage = ReportImage = __decorate([
    (0, typeorm_1.Entity)("report_images")
], ReportImage);
//# sourceMappingURL=ReportImage.js.map