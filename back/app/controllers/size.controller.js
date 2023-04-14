const sizeService = require("../services/size.service");
const responseDto = require("../dtos/response.dto");
const sizesDto = require("../dtos/sizes.dto");
const apiError = require("../exceptions/api-error");
const codeErrors = require("../exceptions/code_errors");

class SizeController {

    async getSizes(req, res) {
        try {
            const size = await sizeService.getSizes(req.query);
            responseDto.response = size.map(e => {
                return new sizesDto(e);
            });
            responseDto.page = {totalRecords: await sizeService.getTotal()};
            return res.json(responseDto);
        } catch (err) {
            console.log("err", err);
        }
    }

    async getSizeOne(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }
            responseDto.response = new sizesDto(await sizeService.getSizeOne(id));
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
            responseDto.response = new sizesDto(await sizeService.published(_id, published));
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }

    async postSize(req, res, next) {
        try {
            const body = req.body;

            if (!body.code || !body.name) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }

            body.code = body.code.toLowerCase().replaceAll(" ", "_");
            const size = await sizeService.createSize(body);
            responseDto.response = new sizesDto(size);
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }

    async putSize(req, res, next) {
        try {
            const putBody = req.body;
            if (!putBody.code || !putBody.name) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }

            await sizeService.editSize(putBody);
            responseDto.response = new sizesDto(await sizeService.getSizeOne(putBody.id));
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }

    async deleteSizeOne(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }
            responseDto.response = await sizeService.deleteSizeOne(id);
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }

    async deleteSizeMany(req, res, next) {
        try {
            const ids = JSON.parse(req.query.filter);
            if (!ids.id) {
                return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
            }
            await sizeService.deleteSizeMany(ids.id);
            responseDto.response = [{id: "", value: ""}];
            return res.json(responseDto);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SizeController();