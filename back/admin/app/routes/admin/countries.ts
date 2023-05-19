const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../../../middlewares/roles.middleware");
const countryController = require("../../controllers/country.controller");


router.get("/countries",
  rolesMiddleware(["ADMIN"]),
  countryController.getCountries);

router.get("/countries/:id",
  rolesMiddleware(["ADMIN"]),
  countryController.getCountryOne);

router.post("/countries",
  rolesMiddleware(["ADMIN"]),
  countryController.postCountry);

router.put("/countries",
  rolesMiddleware(["ADMIN"]),
  countryController.putCountry);

router.delete("/countries/:id",
  rolesMiddleware(["ADMIN"]),
  countryController.deleteCountryOne);
router.delete("/countries",
  rolesMiddleware(["ADMIN"]),
  countryController.deleteCountryMany);

module.exports = router;

