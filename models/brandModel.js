const db = require("./db");
const getAllBrands = (callback) => {
    const sql = `
        SELECT
            b.brand_id,
            b.brand_name,
            c.company_name,
            c.group_name,
            b.chain_id
        FROM brands b
        JOIN chains c
        ON b.chain_id = c.chain_id
        WHERE b.is_active = 1
        ORDER BY b.brand_id DESC
    `;

    db.query(sql, callback);
};

const checkBrandExists = (brandName, callback) => {

    const sql = `
        SELECT *
        FROM brands
        WHERE brand_name = ?
        AND is_active = 1
    `;

    db.query(sql, [brandName], callback);

};

const addBrand = (brandName, chainId, callback) => {

    const sql = `
        INSERT INTO brands
        (brand_name, chain_id)
        VALUES (?, ?)
    `;

    db.query(sql, [brandName, chainId], callback);

};

const getBrandById = (id, callback) => {

    const sql = `
        SELECT *
        FROM brands
        WHERE brand_id = ?
    `;

    db.query(sql, [id], callback);

};

const updateBrand = (id, brandName, chainId, callback) => {

    const sql = `
        UPDATE brands
        SET
            brand_name = ?,
            chain_id = ?
        WHERE brand_id = ?
    `;

    db.query(sql, [brandName, chainId, id], callback);

};

const getCompanies = (callback) => {

    const sql = `
        SELECT *
        FROM chains
        WHERE is_active = 1
    `;

    db.query(sql, callback);

};
const checkZoneRelation = (brandId, callback) => {

    const sql = `
        SELECT *
        FROM zones
        WHERE brand_id = ?
    `;

    db.query(sql, [brandId], callback);

};

const softDeleteBrand = (brandId, callback) => {

    const sql = `
        UPDATE brands
        SET is_active = 0
        WHERE brand_id = ?
    `;

    db.query(sql, [brandId], callback);

};
const getDashboardCounts = (callback) => {

    const sql = `
        SELECT
            COUNT(*) AS totalBrands,
            SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS activeBrands,
            SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactiveBrands
        FROM brands
    `;

    db.query(sql, callback);

};
const filterByCompany = (chainId, callback) => {

    const sql = `
        SELECT
            b.*,
            c.company_name,
            c.group_name
        FROM brands b
        JOIN chains c
        ON b.chain_id = c.chain_id
        WHERE b.chain_id = ?
        AND b.is_active = 1
    `;

    db.query(sql, [chainId], callback);

};
const filterByGroup = (groupName, callback) => {

    const sql = `
        SELECT
            b.*,
            c.company_name,
            c.group_name
        FROM brands b
        JOIN chains c
        ON b.chain_id = c.chain_id
        WHERE c.group_name = ?
        AND b.is_active = 1
    `;

    db.query(sql, [groupName], callback);

};

module.exports = {
    getAllBrands,
    checkBrandExists,
    addBrand,
    getBrandById,
    updateBrand,
    getCompanies,
    checkZoneRelation,
    softDeleteBrand,
    getDashboardCounts,
    filterByCompany,
    filterByGroup
};