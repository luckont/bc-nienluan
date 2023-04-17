const HoidongService = require("../services/hoidong.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { response } = require("../../app");

exports.create = async (req, res, next) => {
    if (!req.body?.mshd) {
        return next(new ApiError(400, "MSHD can not be empty"));
    }

    try {
        const hoidongService = new HoidongService(MongoDB.client);
        const document = await hoidongService.create(req.body);
        return res.send(document);  
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the hoidong")
        );
    }
};

//Retrieve all hoidongs of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const hoidongService = new HoidongService(MongoDB.client);
        const { mshd } = req.query;
        if (mshd) {
            documents = await hoidongService.findByName(mshd);
        } 
        else {
            documents = await hoidongService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving hoidongs", error)
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const hoidongService = new HoidongService(MongoDB.client);
        const document = await hoidongService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Hoidong not found"));
        }
        return res.send(document);  
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving hoidong with id = ${req.params.id}`)
        );
    }
};


exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    }

    try {
        const hoidongService = new HoidongService(MongoDB.client);
        const document = await hoidongService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Hoidong not found"));
        }
        return res.send({ message: "Hoidong was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating hoidong with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const hoidongService = new HoidongService(MongoDB.client);
        const document = await hoidongService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Hoidong not found"));
        }
        return res.send({ message: "Hoidong was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete hoidong with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const hoidongService = new HoidongService(MongoDB.client);
        const deletedCount = await hoidongService.deleteAll();
        return res.send({
            message: `${deletedCount} hoidongs were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                " An error occurred while removing all hoidongs "
            )
        );
    }
};

exports.findAllStatusST = async (req, res, next) => {
    try {
        const hoidongService = new HoidongService(MongoDB.client);
        const documents = await hoidongService.findStatusST();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                " An error occurred while retrieving statusST hoidongs "
            )
        );
    }
};






