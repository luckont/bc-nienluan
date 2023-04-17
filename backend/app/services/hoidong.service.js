const { ObjectId } = require("mongodb");

class HoidongsService {
    constructor(client) {
        this.Hoidong = client.db().collection("hoidong");
    }

    extractHoidongData(payload){
        const hoidong = {
            mshd: payload.mshd,
            phong: payload.phong,
            thoigian: payload.thoigian,
            tenchutich: payload.tenchutich,
            tenuyvien: payload.tenuyvien,
            tenthuky: payload.tenthuky,
            hinhthuc: payload.hinhthuc,
        };

        return hoidong;
    }
    async create(payload) {
        const hoidong = this.extractHoidongData(payload);
        const result = await this.Hoidong.insertOne(
            hoidong,
        );
        return result.value;
    }

    async find(filter) { // {name:abc}
        const cursor = await this.Hoidong.find(filter);
        return await cursor.toArray();
    }

    async findName(filter) { // {name:abc}
        const cursor = await this.Hoidong.findOne(filter);
        return await cursor;
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Hoidong.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractHoidongData(payload);
        const result = await this.Hoidong.findOneAndUpdate(
            filter, {
                $set: update
            }, {
                returnDocument: "after"
            }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Hoidong.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }); 
        return result.value;
    }

    async findStatusST() {
        return await this.find({ statusST: true });
    }

    async deleteAll() {
        const result = await this.Hoidong.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = HoidongsService;