const { ObjectId } = require("mongodb");

class UsersService {
    constructor(client) {
        this.User = client.db().collection("users");
    }

    extractUserData(payload){
        const user = {
            username: payload.username,
            password: payload.password,
            mssv: payload.mssv,
            name: payload.name,
            email: payload.email,
        };

        return user;
    }
    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.insertOne(
            user,
        );
        return result.value;
    }

    async find(filter) { // {name:abc}
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findName(filter) { // {name:abc}
        const cursor = await this.User.findOne(filter);
        return await cursor;
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter, {
                $set: update
            }, {
                returnDocument: "after"
            }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }); 
        return result.value;
    }

    async findStatusST() {
        return await this.find({ statusST: true });
    }

    async deleteAll() {
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = UsersService;