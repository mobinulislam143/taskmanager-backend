const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const TaskModel = require('../models/TaskModel')

exports.CreateTask = async (req, res) => {
    try {
        const email = req.headers.email
        const reqBody = req.body;
        reqBody.email = email
        const result = await TaskModel.create(reqBody);

        res.status(200).json({ status: "success", data: result });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};
exports.updateTaskStatus = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const status = req.params.status;
        const query = { _id: id };
        const reqBody = { status: status };

        const data = await TaskModel.updateOne(query, reqBody);
        res.status(200).json({ status: "success", data: data });
    } catch (error) {
        res.status(400).json({ status: "fail", data: error.toString() });
    }
};
exports.readTask = async (req, res) => {
    try {
        const data = await TaskModel.find();
        res.status(200).json({ status: "success", data: data });
    } catch (error) {
        res.status(400).json({ status: "fail", data: error.toString() });
    }
};

exports.TaskStatusCount = async (req, res) => {
    try {
        let email = req.headers['email']
        let total = await TaskModel.find().count()
        const data = await TaskModel.aggregate([
            {$match: {email: email}},
            {$group: {_id: "$status", sum: {$count: {}}}}
        ])
        res.status(200).json({ status: "success", total:total, data: data });
    } catch (error) {
        res.status(400).json({ status: "fail", data: error.toString() });
    }
};

exports.ListByStatus = async (req, res) => {
    try {
        const email = req.headers.email
        const status = req.params.status
        let SearchRegex = {"$regex": status, "$options":"i"}
        let matchStage = {$match: {status: SearchRegex, email:email}}
        let projection = {$project: {_id: 1, title: 1, description: 1, status: 1, 
            createdAt: {
                $dateToString:{
                    date: "$createdAt",
                    format: "%d-%m-%Y"
                }
            }
            }}
        const data = await TaskModel.aggregate([
            matchStage,
            projection

        ])
        res.status(200).json({ status: "success", data: data });
    } catch (error) {
        res.status(400).json({ status: "fail", data: error.toString() });
    }
};
