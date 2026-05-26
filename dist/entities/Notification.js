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
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
const Report_1 = require("./Report");
const User_1 = require("./User");
let Notification = class Notification {
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "notification_id" }),
    __metadata("design:type", Number)
], Notification.prototype, "notificationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "report_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "reportId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_read", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.notifications),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", Object)
], Notification.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Report_1.Report, (report) => report.notifications),
    (0, typeorm_1.JoinColumn)({ name: "report_id" }),
    __metadata("design:type", Object)
], Notification.prototype, "report", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)("notifications")
], Notification);
//# sourceMappingURL=Notification.js.map