const express = require("express");
const {default : Report} = require("../Schema/ReportSchema.js");
const { check, validationResult } = require("express-validator");
const router = express();

router.post("/reports", [
    check("userID", "Invalid user id.").isLength({ min: 4, max: 30 }).trim(),
    check("marketID", "Invalid market id.").isLength({ min: 4, max: 30 }).trim(),
    check("marketName", "Invalid market name").isLength({ min: 3, max: 50 }).trim(),
    check("cmdtyID", "Invalid comodity id.").isLength({ min: 4, max: 30 }).trim(),
    check("cmdtyName", "Invalid comodity name.").isLength({ min: 3, max: 50 }).trim(),
    check("priceUnit", "Invalid price unit.").isLength({ min: 1, max: 10 }).trim(),
    check("convFctr", "Invalid convert factor.").isFloat({gt:0}).isLength({ min: 1,max:10 }).trim(),
    check("price", "Invalid price.").isFloat({gt:0}).isLength({ min: 1, max: 10 }).trim(),
],async (req,res)=>{

    const {userID,marketID,marketName,cmdtyID,cmdtyName,convFctr,price} = req.body;
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const reports = await Report.find({marketID,cmdtyID})
        const basePrice = price/convFctr;

        
            if(reports.length === 0){
                const newReport = new Report({
                    marketID,
                    marketName,
                    cmdtyID,
                    cmdtyName,
                    users:[userID],
                    priceUnit:"Kg",
                    price:basePrice.toFixed(2)
                })
                const reported = await newReport.save();
                res.status(200).json({
                    status:"success",
                    reportID:reported._id
                });
            }else if(reports.length > 0){
                const newBasePrice = (reports[0].price + basePrice) / 2;
                const updated = await Report.findOneAndUpdate({marketID,cmdtyID},{price:newBasePrice.toFixed(2),"$push":{users : userID}});
                res.status(200).json({
                    status:"success",
                    reportID:updated._id
                });
            }
        } catch (error) {
            res.status(500).json({
                message:"something went wrong",
                error
            })
    }

})

router.get("/reports",async(req,res)=>{
    const {reportID} = req.query;
    try {
        if(reportID){
            const report = await Report.findById(reportID);
            res.status(200).json(report);
        }else{
            res.status(400).json({
                status:"failed",
                message:"report Id required"
            });
        }
        } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
})

module.exports = {default:router}