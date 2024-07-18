"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editOne = exports.deleteOne = exports.addOne = exports.getOne = exports.getAll = exports.ad = void 0;
const adsmodel_1 = require("../model/adsmodel");
const dat = ['youssef', 'mohamed', 'fathi', 'abdallah'];
const ad = async (req, res, next) => {
    const ad = await adsmodel_1.Ads.create(req.body);
};
exports.ad = ad;
const getAll = (req, res, next) => {
    const data = dat;
    res.status(200).json({ data });
};
exports.getAll = getAll;
const getOne = (req, res, next) => {
    const id = req.params.id;
    let index;
    if (typeof id === 'number')
        index = id;
    else
        index = Number(id);
    const data = dat[index];
    if (!data)
        return res.status(404).json({ message: 'id not found' });
    res.status(200).json({ data });
};
exports.getOne = getOne;
const addOne = (req, res, next) => {
    const data = req.query.data;
    dat.push(data);
    res.status(201).json({ dat });
};
exports.addOne = addOne;
const deleteOne = (req, res, next) => {
    const id = req.params.id;
    let index;
    if (typeof id === "number")
        index = id;
    else
        index = Number(id);
    const data = dat[index];
    if (!data)
        return res.status(404).json({ message: "id not found" });
    dat.splice(index, 1);
    res.status(200).json({ dat });
};
exports.deleteOne = deleteOne;
const editOne = (req, res, next) => {
    const id = req.params.id;
    const data = req.query.data;
    let index;
    if (typeof id === "number")
        index = id;
    else
        index = Number(id);
    if (index && dat.length > index) {
        dat[index] = data;
        res.status(201).json({ dat });
    }
    else {
        return res.status(404).json({ message: "invalid Id" });
    }
    //   if (!data) 
};
exports.editOne = editOne;
