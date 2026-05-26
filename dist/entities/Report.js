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
exports.Report = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const Notification_1 = require("./Notification");
const ReportImage_1 = require("./ReportImage");
const Status_1 = require("./Status");
const User_1 = require("./User");
let Report = class Report {
};
exports.Report = Report;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "report_id" }),
    __metadata("design:type", Number)
], Report.prototype, "reportId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Report.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Report.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status_id", type: "int", nullable: true, default: 1 }),
    __metadata("design:type", Object)
], Report.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", Object)
], Report.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Report.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Report.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Report.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Report.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.reports),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", Object)
], Report.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.reports),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", Object)
], Report.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Status_1.Status, (status) => status.reports),
    (0, typeorm_1.JoinColumn)({ name: "status_id" }),
    __metadata("design:type", Object)
], Report.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReportImage_1.ReportImage, (image) => image.report, { cascade: true }),
    __metadata("design:type", Array)
], Report.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notification_1.Notification, (notification) => notification.report),
    __metadata("design:type", Array)
], Report.prototype, "notifications", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)("reports")
], Report);
//# sourceMappingURL=Report.js.map