// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const fs = require('fs');

// Define a function to read the budget data from a JSON file
function readBudgetFromFile() {
    try {
        const budgetData = fs.readFileSync('budget.json', 'utf8');
        return JSON.parse(budgetData);
    } catch (err) {
        console.error('Error reading budget data from file:', err);
        return { myBudget: [] };
    }
}

// Endpoint to get budget data from the JSON file
app.get('/budget', (req, res) => {
    const budget = readBudgetFromFile();
    res.json(budget);
});

app.use('/',express.static('public'))

app.get('/hello', (req, res) => {
    res.send("hello world man!!");
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
