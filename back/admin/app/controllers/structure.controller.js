const structureService = require("../services/structure.service");
const responseDto = require("../../../dtos/response.dto");
const structuresDto = require("../../../dtos/structures.dto");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");

class StructureController {

    async getStructures(req, res) {
        try {
            const structure = await structureService.getStructures(req.query);
            responseDto.response = structure.map(e => {
                return new structuresDto(e);
            });
            responseDto.page = {totalRecords: await structureService.getTotal()};
            return res.json(responseDto);
        } catch (err) {
            console.log("err", err);
        }
    }

    async getStructureOne(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }
            responseDto.response = new structuresDto(await structureService.getStructureOne(id));
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }

    async published(req, res, next) {
        try {
            const {_id, published} = req.body;
            if (!_id || published === undefined) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }
            responseDto.response = new structuresDto(await structureService.published(_id, published));
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }

    async postStructure(req, res, next) {
        try {
            const body = req.body;
            if (!body.code || !body.name) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }

            body.code = body.code.toLowerCase().replaceAll(" ", "_");
            const size = await structureService.createStructure(body);
            responseDto.response = new structuresDto(size);
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }

    async putStructure(req, res, next) {
        try {
            const putBody = req.body;
            if (!putBody.code || !putBody.name) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }

            await structureService.editStructure(putBody);
            responseDto.response = new structuresDto(await structureService.getStructureOne(putBody.id));
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }

    async deleteStructureOne(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }
            responseDto.response = await structureService.deleteStructureOne(id);
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }

    async deleteStructureMany(req, res, next) {
        try {
            const ids = JSON.parse(req.query.filter);
            if (!ids.id) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }
            await structureService.deleteStructureMany(ids.id);
            responseDto.response = [{id: "", value: ""}];
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new StructureController();