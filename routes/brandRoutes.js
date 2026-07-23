const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brandController");

// Dashboard
router.get("/", brandController.dashboard);

// View Brands
router.get("/brands", brandController.viewBrands);

// Add Brand
router.get("/brands/add", brandController.showAddBrand);
router.post("/brands/add", brandController.addBrand);

// Edit Brand
router.get("/brands/edit/:id", brandController.showEditBrand);
router.post("/brands/edit/:id", brandController.updateBrand);

// Delete Brand
router.post("/brands/delete/:id", brandController.deleteBrand);

// Filter by Company
router.get("/brands/filter/company", brandController.filterCompany);

// Filter by Group
router.get("/brands/filter/group", brandController.filterGroup);

module.exports = router;