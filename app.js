const inquirer = require("inquirer");
const fs = require('fs');
const path = require("path");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Define an array to hold the employees
const teamMembers = [];

// Define a general question to prompting to add team members
const generalQuestion = [
    {
        type: "list",
        name: "addTeamMember",
        message: "What kind of team member would you like to add? (use arrow keys)",
        choices: ["Manager", "Engineer", "Intern", "Done adding team members"]
    }
]
// Create prompts for adding a manager to the team
const managerQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is your manager's Id?"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email?"
    },
    {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your manager's office number?"
    },

];
// Create prompts for adding an engineer to the team
const engineerQuestions = [
    {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?"
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?"
    },
    {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?"
    },
    {
        type: "input",
        name: "engineerGithubUsername",
        message: "What is your engineer's GithHub username?"
    },
];
// Create prompts for adding an intern to the team
const internQuestions = [
    {
        type: "input",
        name: "internName",
        message: "What is your intern's name?"
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?"
    },
    {
        type: "input",
        name: "internId",
        message: "What is your intern's id?"
    },
    {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school?"
    }
];
// Prompt the general question and ask follow up based on user's choice of manager, engineer or intern
const init = () => {
    inquirer.prompt(generalQuestion).then(function (answers) {
        if (answers.addTeamMember === "Manager") {
            addManager();

        }
        else if (answers.addTeamMember === "Engineer") {
            addEngineer();

        }
        else if (answers.addTeamMember === "Intern") {
            addIntern();
        } else {
            myFunc(render(teamMembers));
            // myFunc(render(teamMembers))
        }
    })
}
// Create a method to add manager
function addManager() {
    inquirer.prompt(managerQuestions).then(function (answers) {
        // Initialize a new manager object
        const newManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
        // add the newly added manager to the employee list array and restart the question
        teamMembers.push(newManager);
        init()
    })
};
// Create a method to add engineer
function addEngineer() {
    inquirer.prompt(engineerQuestions).then(function (answers) {
        // Initialize a new engineer object
        const newEngineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithubUsername)
        // add the newly added engineer to the employee list array and restart the question
        teamMembers.push(newEngineer);
        init()
    })
};
// Create a method to add intern
function addIntern() {
    inquirer.prompt(internQuestions).then(function (answers) {
        // Initialize a new intern object
        const newIntern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
        // add the newly added intern to the employee list array and restart the question
        teamMembers.push(newIntern);
        init()
    })
};

// create a function for the html output file
function myFunc() {
    fs.writeFile(outputPath, render(teamMembers), function (err) {
        if (err) {
            console.log(err);
        }
    })
}

// Start the prompt
init();



