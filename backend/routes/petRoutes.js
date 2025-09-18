const router = require("express").Router();
const PetController = require("../controllers/PetController");
const protectedRoutes = require("../helpers/protectedRoutes");
const { imageUpload } = require("../helpers/imageUpload");

router.post(
  "/create",
  protectedRoutes,
  imageUpload.array("images"),
  PetController.createPet
);
router.get("/", PetController.getAllPets);
router.get("/userPets", protectedRoutes, PetController.getUserPets);
router.get("/userAdoptions", protectedRoutes, PetController.getUserAdoptions);
router.patch("/adopt/:id", protectedRoutes, PetController.adoptPet);
router.patch("/conclude/:id", protectedRoutes, PetController.concludeAdopt);
router.get("/:id", PetController.getPet);
router.delete("/:id", protectedRoutes, PetController.deletePet);
router.patch(
  "/:id",
  protectedRoutes,
  imageUpload.array("images"),
  PetController.updatePet
);
module.exports = router;
