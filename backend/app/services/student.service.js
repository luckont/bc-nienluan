const { ObjectId } = require("mongodb");

class StudentService {
    constructor(client) {
        this.Student = client.db().collection("students");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    extractStudentData(payload) {
        const student = {
            GVHD: payload.GVHD,
            mssv: payload.mssv,
            name: payload.name,
            email: payload.email,
            nameProjectVi: payload.nameProjectVi,
            nameProjectEn: payload.nameProjectEn,
            timeCreate: payload.timeCreate,
        };
        // Remove undefined fields
        Object.keys(student).forEach(
            (key) => student[key] === undefined && delete student[key]
        );

        return student;
    }

    async create(payload) {
        const student = this.extractStudentData(payload);
        const result = await this.Student.findOneAndUpdate(
            student,
            { $set: { statusST: student.statusST === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Student.find(filter);
        return await cursor.toArray();
    }

    async findByName(mssv) {
        return await this.find({
            mssv: { $regex: new RegExp(mssv), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Student.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractStudentData(payload);
        const result = await this.Student.findOneAndUpdate(
            filter, {
                $set: update
            }, {
                returnDocument: "after"
            }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Student.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }); 
        return result.value;
    }

    async findStatusST() {
        return await this.find({ statusST: true });
    }

    async deleteAll() {
        const result = await this.Student.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = StudentService;