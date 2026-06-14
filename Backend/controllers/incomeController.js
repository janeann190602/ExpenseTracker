const xlsx = require('xlsx');
const Income = require('../models/Income');

// Add income
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
       const { icon, source, amount, date } = req.body;

       // Validation: Check for missing fields
       if(!source || !amount || !date){
            return res.status(400).json({ message: "All fields are required"});
       }

       const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date: new Date(date)
       });

       await newIncome.save();
       res.status(200).json(newIncome);
    } catch(error){
        res.status(500).json({message: "Server Error"});
    }
    
}

//Get all income
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try{
    const income = await Income.find(({ userId })).sort({ date: -1});    
    res.json(income);
    } catch(error){
        res.status(500).json({message: "Server Error"});
    }
    

}

//Delete income
exports.deleteIncome = async (req, res) => {
    try{
    await Income.findByIdAndDelete(req.params.id);   
    res.json({message: 'Income deleted successfully'});
    } catch(error){
        res.status(500).json({message: "Server Error"});
    }
}

//Download income
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        // Create workbook
        const wb = xlsx.utils.book_new();

        // Create worksheet
        const ws = xlsx.utils.json_to_sheet(data);

        // Append sheet
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Write file
        xlsx.writeFile(wb, "income_details.xlsx");

        // Download file
        return res.download("income_details.xlsx");

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
