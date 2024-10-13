/**
 * Represents an agent in a system.
 *
 * Each agent has a role, a goal, a backstory, and an optional language model (llm).
 * The agent can also have memory, operate in verbose mode, and delegate tasks to other agents.
 *
 * @class Agent
 * @param {string} name - The name of the agent.
 * @param {string} role - The role of the agent.
 * @param {string} goal - The objective of the agent.
 * @param {string} [backstory] - The backstory of the agent.
 * @param {string[]} [tools] - Tools at the agent's disposal.
 * @param {boolean} [verbose=false] - Whether to enable verbose mode.
 * @param {string} [llm] - The language model that will run the agent.
 * @param {boolean} [memory=false] - Whether the agent should have memory or not.
 */

import OpenAI from 'openai';
import dotenv from 'dotenv'; 
dotenv.config();

export interface AgentOptions {
    name: string;
    role: string;
    goal: string;
    backstory: string;
    tools?: string[];
    verbose?: boolean;
    llm?: string; // Optional, the model to use (default is GPT-4)
}

export class Agent {
    name: string;
    role: string;
    goal: string;
    backstory: string;
    tools: string[];
    verbose: boolean;
    llm: string;
    client: OpenAI;

    constructor({ name, role, goal, backstory = '', tools = [], verbose = false, llm }: AgentOptions) {
        this.name = name;
        this.role = role;
        this.goal = goal;
        this.backstory = backstory;
        this.tools = tools;
        this.verbose = verbose;
        this.llm = llm || process.env.OPENAI_MODEL_NAME || 'gpt-4'; // Default to GPT-4

        console.log("process.env", process.env.OPENAI_API_KEY);
        
        // Set up OpenAI client
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // Assumes API key is in environment
        });
    }
    
    // Method to execute agent's goal with LLM (OpenAI API Call)
    async executeGoal() {
        // System prompt for OpenAI
        const systemPrompt = `You are ${this.name}, a ${this.role}. ${this.backstory ? 'Backstory: ' + this.backstory : ''}`;

        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OpenAI API key not set in environment variables.");
        }

        if (this.verbose) {
            console.log(`${this.name} (Role: ${this.role}) is executing goal: ${this.goal} using LLM: ${this.llm}`);
        }

        try {
            const response = await this.client.chat.completions.create({
                model: this.llm,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: this.goal }
                ],
            });

            const result = response.choices?.[0]?.message?.content?.trim() ?? 'No content';
            return `Executed goal "${this.goal}" with result: ${result}`;
        } catch (error) {
            console.error('Error executing goal with OpenAI:', error);
            throw new Error("Failed to execute goal with the language model.");
        }
    }

    // Communication method
    communicate(message: string) {
        if (this.verbose) {
            console.log(`${this.name} says: ${message}`);
        }
    }
}