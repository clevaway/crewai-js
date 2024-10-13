"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crew = void 0;
class Crew {
    constructor({ name, agents, tasks, verbose = false }) {
        this.name = name;
        this.agents = agents;
        this.tasks = tasks;
        this.verbose = verbose;
    }
    // Method to kick off the crew and execute all tasks
    kickoff() {
        if (this.verbose) {
            console.log(`Crew ${this.name} is starting...`);
        }
        this.tasks.forEach(task => {
            if (this.verbose) {
                console.log(`Executing task: ${task.description}`);
            }
            const result = task.execute();
            if (result instanceof Promise) {
                result.then(res => {
                    if (this.verbose) {
                        console.log(`Task result: ${res}`);
                    }
                });
            }
            else {
                if (this.verbose) {
                    console.log(`Task result: ${result}`);
                }
            }
        });
    }
    // Method to add a new task
    addTask(task) {
        this.tasks.push(task);
        if (this.verbose) {
            console.log(`Task "${task.description}" added to Crew ${this.name}.`);
        }
    }
}
exports.Crew = Crew;
