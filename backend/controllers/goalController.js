const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler( async (req, res) => {

    const goals = await Goal.find({ user: req.user.id }) // gets all info

    res.status(200).json(goals)
})

// @desc    set goals
// @route   POST /api/goals/:id
// @access  private
const setGoals = asyncHandler( async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("E: please add a text field")
    }

    // console.log(req.user)
    // console.log(req.user._id)

    
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @desc    update goals
// @route   PUT /api/goals/:id
// @access  private
const updateGoals = asyncHandler( async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { 
        new: true 
    })

    res.status(200).json(updatedGoal)
})

// @desc    delete goals
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }


    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // const deletedGoal = await Goal.findByIdAndRemove(req.params.id)
    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}
