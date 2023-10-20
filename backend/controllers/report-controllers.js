
const Reports = require("../model/ReportModels");

const Report = async (req, res) => {
    const { date,
        project_name,
        status_update,
        obstacles,
        need_clarification,
        explanation,
        plans,
        attacment, } = req.body;
   

    const report = new Reports({
        date,
        project_name,
        status_update,
        obstacles,
        need_clarification,
        explanation,
        plans,
        attacment,
    });

    try {
        await report.save();
        res.status(201).json({ message: "Report Submitted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getReports = async (req, res) => {
    const { category } = req.query;   // Get the category from the query parameter

    try {
        let repo;

        if (category) {
            // If a category is specified, filter products by category
            repo = await Reports.find({ category });
        } else {
            repo = await Reports.find();
        }
        res.status(200).json({ repo })
        // const products = await MensFashionProduct.find();
        // res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Add more controller functions as needed (e.g., retrieve all products, retrieve a specific product, update, delete, etc.)

module.exports = {
    Report,
    getReports
};
