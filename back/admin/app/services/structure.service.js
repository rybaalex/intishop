const structureModel = require("../../../models/structure.model");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");

class StructureService {
    async getStructures(query) {
        const sort = JSON.parse(query.sort);
        const range = JSON.parse(query.range);
        return structureModel.find().skip(range[0]).limit(range[1] - range[0]).sort([sort]);
    }

    async getTotal() {
        return structureModel.find().count();
    }

    async getStructureOne(id) {
        return structureModel.findOne({_id: id});
    }

    async published(_id, published) {
        const structure = await structureModel.findOne({_id});
        if (!structure) {
            throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
        }
        structure.published = published;
        await structure.save();
        return structure;
    }

    async createStructure(body) {
        const {code} = body;
        const findStructure = await structureModel.findOne({code: code});
        if (findStructure) {
            throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
        }
        return structureModel.create(body);
    }

    async editStructure(body) {
        const {id} = body;
        const findStructure = await structureModel.findOne({_id: id});
        if (!findStructure) {
            throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
        }
        return structureModel.updateOne({_id: id}, {
            $set: {
                name: body.name,
                code: body.code,
                sort: body.sort,
            }
        });
    }

    async deleteStructureOne(_id) {
        const findStructure = await structureModel.findOne({_id});
        if (!findStructure) {
            throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
        }
        return structureModel.deleteOne({_id});
    }

    async deleteStructureMany(ids) {
        return structureModel.deleteMany({_id: ids});
    }
}

module.exports = new StructureService();