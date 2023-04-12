const StudentService = require("../services/student.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { response } = require("../../app");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const studentService = new StudentService(MongoDB.client);
        const document = await studentService.create(req.body);
        return res.send(document);  
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the student")
        );
    }
};

//Retrieve all students of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const studentService = new StudentService(MongoDB.client);
        const { mssv } = req.query;
        if (mssv) {
            documents = await studentService.findByName(mssv);
        } 
        else {
            documents = await studentService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving students", error)
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const studentService = new StudentService(MongoDB.client);
        const document = await studentService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Student not found"));
        }
        return res.send(document);  
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving student with id = ${req.params.id}`)
        );
    }
};


exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    }

    try {
        const studentService = new StudentService(MongoDB.client);
        const document = await studentService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Student not found"));
        }
        return res.send({ message: "Student was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating student with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const studentService = new StudentService(MongoDB.client);
        const document = await studentService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Student not found"));
        }
        return res.send({ message: "Student was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete student with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const studentService = new StudentService(MongoDB.client);
        const deletedCount = await studentService.deleteAll();
        return res.send({
            message: `${deletedCount} students were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                " An error occurred while removing all students "
            )
        );
    }
};

exports.findAllStatusST = async (req, res, next) => {
    try {
        const studentService = new StudentService(MongoDB.client);
        const documents = await studentService.findStatusST();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                " An error occurred while retrieving statusST students "
            )
        );
    }
};






