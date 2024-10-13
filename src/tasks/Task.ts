// src/tasks/Task.ts
import { Agent } from '../agents/Agent';

export interface TaskOptions {
    description: string;
    agent: Agent; // The agent assigned to the task
    outputFormat?: 'raw' | 'json'; // Optional format for task output
    async?: boolean; // Optional, for asynchronous execution
}

export class Task {
    description: string;
    agent: Agent;
    outputFormat: 'raw' | 'json';
    async: boolean;

    constructor({ description, agent, outputFormat = 'raw', async = false }: TaskOptions) {
        this.description = description;
        this.agent = agent;
        this.outputFormat = outputFormat;
        this.async = async;
    }

    // Method to execute the task
    async execute() {
        if (this.async) {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await this.agent.executeGoal();
                    resolve(this.formatOutput(result));
                }, 1000); // Simulate async delay
            });
        } else {
            const result = await this.agent.executeGoal();
            return this.formatOutput(result);
        }
    }

    // Method to format task output
    formatOutput(output: string) {
        if (this.outputFormat === 'json') {
            return JSON.stringify({ result: output });
        }
        return output;
    }
}