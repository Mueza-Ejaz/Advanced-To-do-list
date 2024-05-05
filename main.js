#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
console.log(chalk.blue("\n \t WELCOME IN  ADVANCE TODO-LIST\n "));
let condition = true;
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: chalk.green("\n \t Select option you want to:"),
            choices: ["Add", "Update", "View", "Delete", "Exit"]
        },
    ]);
    if (ans.select === "Add") {
        let addTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "Add items in the list",
                validate: function (input) {
                    if (input.trim() == "") {
                        return chalk.red("\n \tPlease enter a non-empty item.");
                    }
                    return true;
                }
            }
        ]);
        if (addTodo.todo.trim() !== "") {
            todos.push(addTodo.todo);
            todos.forEach(todo => console.log(todo));
        }
    }
    if (ans.select === "Update") {
        let updateTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "list",
                message: "Let's update items in the list:",
                choices: todos.map(item => item)
            }
        ]);
        let addTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "Add items in the list"
            }
        ]);
        let newTodo = todos.filter(val => val !== updateTodo.todo);
        todos = [...newTodo, addTodo.todo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "View") {
        console.log(chalk.yellow("\n \t ***** TO-DO LIST *****"));
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "Delete") {
        let deleteTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "list",
                message: chalk.green("\n \tSelect item to delete:"),
                choices: todos.map(item => item)
            }
        ]);
        let newTodo = todos.filter(val => val !== deleteTodo.todo);
        todos = [...newTodo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "Exit") {
        console.log(chalk.red("Ending Program....."));
        condition = false;
    }
}
