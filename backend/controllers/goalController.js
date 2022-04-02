const asyncHandler = require('express-async-handler')

// @desc    get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler( async (req, res) => {

    res.status(200).json({message: "getGoals"})
})

// @desc    set goals
// @route   POST /api/goals/:id
// @access  private
const setGoals = asyncHandler( async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("please add a text field")
    }
    console.log(req.body)

    res.status(200).json({message: "setGoals"})
})

// @desc    update goals
// @route   PUT /api/goals/:id
// @access  private
const updateGoals = asyncHandler( async (req, res) => {
    res.status(200).json({message: `update ${req.params.id}`})
})

// @desc    delete goals
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: `delete ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}
