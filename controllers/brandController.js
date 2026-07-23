const brandModel = require("../models/brandModel");
const dashboard = (req, res) => {

    brandModel.getDashboardCounts((err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("dashboard", {
            counts: result[0]
        });

    });

};
const viewBrands = (req, res) => {

    brandModel.getAllBrands((err, brands) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("brands", {
            brands
        });

    });

};
const showAddBrand = (req, res) => {

    brandModel.getCompanies((err, companies) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("addBrand", {
            companies
        });

    });

};
const addBrand = (req, res) => {

    const { brand_name, chain_id } = req.body;

    if (!brand_name || !chain_id) {
        return res.send("All fields are required.");
    }

    brandModel.checkBrandExists(brand_name, (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        if (result.length > 0) {
            return res.send("Brand already exists.");
        }

        brandModel.addBrand(brand_name, chain_id, (err) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.redirect("/brands");

        });

    });

};
const showEditBrand = (req, res) => {

    const id = req.params.id;

    brandModel.getBrandById(id, (err, brand) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        brandModel.getCompanies((err, companies) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.render("editBrand", {

                brand: brand[0],
                companies

            });

        });

    });

};
const updateBrand = (req, res) => {

    const id = req.params.id;

    const { brand_name, chain_id } = req.body;

    brandModel.updateBrand(id, brand_name, chain_id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/brands");

    });

};
const deleteBrand = (req, res) => {

    const id = req.params.id;

    brandModel.checkZoneRelation(id, (err, zone) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        if (zone.length > 0) {

            return res.send("Brand is linked with Zone. Cannot Delete.");

        }

        brandModel.softDeleteBrand(id, (err) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.redirect("/");

        });

    });

};
const filterCompany = (req, res) => {

    const chainId = req.query.chain_id;

    brandModel.filterByCompany(chainId, (err, brands) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("brands", {
            brands
        });

    });

};
const filterGroup = (req, res) => {

    const groupName = req.query.group_name;

    brandModel.filterByGroup(groupName, (err, brands) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("brands", {
            brands
        });

    });

};

module.exports = {

    dashboard,

    viewBrands,

    showAddBrand,

    addBrand,

    showEditBrand,

    updateBrand,

    deleteBrand,

    filterCompany,

    filterGroup

};