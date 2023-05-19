const productModel = require("../../../models/product.model");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");


class ProductService {
  async getProducts(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    return productModel.find().populate(["brands", "size","categories", "structures", "colors", "tags", "stocks"]).skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getProductIds(ids) {
    return productModel.find({ _id: ids });
  }

  async getTotal() {
    return productModel.find().count();
  }

  async published(_id, published) {
    const product = await productModel.findOne({ _id });
    if (!product) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    product.published = published;
    await product.save();
    return product;
  }

  async getProductOne(id) {
    return productModel.findOne({ _id: id });
  }

  async getProductOneAlias(alias) {
    return productModel.findOne({ alias: alias });
  }

  async createProduct(body) {
    return productModel.create(body);
  }

  async editProduct(body) {
    const { id } = body;
    const findProduct = await productModel.findOne({ _id: id });
    if (!findProduct) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return productModel.updateOne({ _id: id }, {
      $set: {
        description: body.description,
        type: body.type,
        image: body.image,
        url: body.url
      }
    });
  }

  async deleteProductOne(_id) {
    return productModel.deleteOne({ _id });
  }

  async deleteProductMany(ids) {
    return productModel.deleteMany({ _id: ids });
  }
}

module.exports = new ProductService();