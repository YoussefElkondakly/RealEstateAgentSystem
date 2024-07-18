"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localController_1 = require("../controllers/localController");
const testLocalRoutes = (0, express_1.Router)();
testLocalRoutes.get('/', localController_1.getAll);
// testLocalRoutes
testLocalRoutes.post('/addAd', localController_1.ad);
testLocalRoutes.get("/add", localController_1.addOne);
testLocalRoutes.get("/:id", localController_1.getOne);
testLocalRoutes.get('/edit/:id', localController_1.editOne);
testLocalRoutes.get("/delete/:id", localController_1.deleteOne);
exports.default = testLocalRoutes;
