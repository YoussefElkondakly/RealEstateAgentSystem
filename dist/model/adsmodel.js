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
exports.Ads = void 0;
// import { Sequelize } from "sequelize";
// import { sequelize } from "../server";
const sequelize_typescript_1 = require("sequelize-typescript");
let Ads = class Ads extends sequelize_typescript_1.Model {
};
exports.Ads = Ads;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Ads.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.IsFloat,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Ads.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Ads.prototype, "area", void 0);
exports.Ads = Ads = __decorate([
    sequelize_typescript_1.Table
], Ads);
