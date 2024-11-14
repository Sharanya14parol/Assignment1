// const PriorityQueue = require('../utils/priorityQueue');
// const Stack = require('../utils/stack');
// const { generateInvoice } = require('../models/violationModel');
// const { logReports } = require('../utils/reportLogger');

// const violationQueue = new PriorityQueue();
// const violationHistory = new Stack();

// const addViolation = (req, res) => {
//     const { id, type, priority, fine } = req.body;
//     const violation = { id, type, priority, fine, timestamp: new Date() };

//     violationQueue.enqueue(violation);
//     violationHistory.push(violation);
//     generateInvoice(violation);

//     res.status(201).json({ message: 'Violation added successfully', violation });
// };

// const getViolations = (req, res) => {
//     res.json({ violations: violationQueue.getQueue() });
// };

// const undoViolation = (req, res) => {
//     const lastViolation = violationHistory.pop();
//     if (!lastViolation) return res.status(404).json({ message: 'No violations to undo' });

//     violationQueue.queue = violationQueue.queue.filter((v) => v.id !== lastViolation.id);
//     res.json({ message: 'Last violation removed', violation: lastViolation });
// };

// const logViolationReport = (req, res) => {
//     logReports(violationQueue.getQueue());
//     res.json({ message: 'Daily report logged successfully' });
// };

// module.exports = { addViolation, getViolations, undoViolation, logViolationReport };

const { Violation, generateInvoice } = require('../models/violationModel');
const PriorityQueue = require('../utils/priorityQueue');
const Stack = require('../utils/stack');
const { logReports } = require('../utils/reportLogger');

const violationQueue = new PriorityQueue();
const violationHistory = new Stack();

const addViolation = async (req, res) => {
    try {
        const { id, type, priority, fine } = req.body;

        const violation = new Violation({ id, type, priority, fine });
        await violation.save();

        violationQueue.enqueue(violation);
        violationHistory.push(violation);
        generateInvoice(violation);

        res.status(201).json({ message: 'Violation added successfully', violation });
    } catch (error) {
        res.status(500).json({ message: 'Error adding violation', error });
    }
};

const getViolations = async (req, res) => {
    try {
        const violations = await Violation.find().sort({ priority: 1 });
        res.json({ violations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching violations', error });
    }
};

const undoViolation = async (req, res) => {
    try {
        const lastViolation = violationHistory.pop();
        if (!lastViolation) return res.status(404).json({ message: 'No violations to undo' });

        await Violation.findByIdAndDelete(lastViolation._id);
        violationQueue.queue = violationQueue.queue.filter((v) => v.id !== lastViolation.id);

        res.json({ message: 'Last violation removed', violation: lastViolation });
    } catch (error) {
        res.status(500).json({ message: 'Error undoing violation', error });
    }
};

const logViolationReport = async (req, res) => {
    try {
        const violations = await Violation.find();
        logReports(violations);
        res.json({ message: 'Daily report logged successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging report', error });
    }
};

module.exports = { addViolation, getViolations, undoViolation, logViolationReport };
