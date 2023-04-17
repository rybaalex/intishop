const sizeModel = require("../../../models/size.model");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");


class SizeService {
    async getSizes(query) {
        const sort = JSON.parse(query.sort);
        const range = JSON.parse(query.range);
        return sizeModel.find().skip(range[0]).limit(range[1] - range[0]).sort([sort]);
    }

    async getTotal() {
        return sizeModel.find().count();
    }

    async getSizeOne(id) {
        return sizeModel.findOne({_id: id});
    }

    async published(_id, published) {
        const size = await sizeModel.findOne({_id});
        if (!size) {
            throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
        }
        size.published = published;
        await size.save();
        return size;
    }

    async createSize(body) {
        const {code} = body;
        const findSize = await sizeModel.findOne({code: code});
        if (findSize) {
            throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
        }
        return sizeModel.create(body);
    }

    async editSize(body) {
        const {id} = body;
        const findSize = await sizeModel.findOne({_id: id});
        if (!findSize) {
            throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
        }
        return sizeModel.updateOne({_id: id}, {
            $set: {
                name: body.name,
                code: body.code,
                sort: body.sort,
                rosSize: body.rosSize,
                waistCircumference: body.waistCircumference,
                hipGirth: body.hipGirth
            }
        });
    }

    async deleteSizeOne(_id) {
        const findSize = await sizeModel.findOne({_id});
        if (!findSize) {
            throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
        }
        return sizeModel.deleteOne({_id});
    }

    async deleteSizeMany(ids) {
        return sizeModel.deleteMany({_id: ids});
    }
}

module.exports = new SizeService();