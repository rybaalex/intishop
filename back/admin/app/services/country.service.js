const countryModel = require("../../../models/countries.model");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");

class CountryService {
  async getCountries(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    return countryModel.find().skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getTotal() {
    return countryModel.find().count();
  }

  async getCountryOne(id) {
    return countryModel.findOne({ _id: id });
  }
  async getCountryIds(ids) {
    return countryModel.find({ _id: ids });
  }
  async createCountry(body) {
    const { code } = body;
    const findCountry = await countryModel.findOne({
      code: code
    });
    if (findCountry) {
      throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
    }

    return countryModel.create(body);
  }

  async editCountry(body) {
    const { id } = body;
    const findCountry = await countryModel.findOne({ _id: id });
    if (!findCountry) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return countryModel.updateOne({ _id: id }, {
      $set: {
        name: body.name,
        code: body.code,
        image: body.image
      }
    });
  }

  async deleteCountryOne(_id, DIR) {
    const findCountry = await countryModel.findOne({ _id });
    if (!findCountry) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
/*    fs.unlink(DIR + findCountry.logo.img, function(err) {
      err && console.log("err", err);
    });*/
    return countryModel.deleteOne({ _id });
  }

  async deleteCountryMany(ids, DIR) {
    const findCountry = await countryModel.find({ _id: ids });

/*    findCountry.map(e => {
      fs.unlink(DIR + e.logo.img, function(err) {
        err && console.log("err", err);
      });
    });*/

    return countryModel.deleteMany({ _id: ids });
  }
}


module.exports = new CountryService();