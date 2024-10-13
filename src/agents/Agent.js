"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Agent {
    constructor({ name, role, goal, backstory = '', tools = [], verbose = false, llm }) {
        this.name = name;
        this.role = role;
        this.goal = goal;
        this.backstory = backstory;
        this.tools = tools;
        this.verbose = verbose;
        this.llm = llm || process.env.OPENAI_MODEL_NAME || 'gpt-4'; // Default to GPT-4
        console.log("process.env", process.env.OPENAI_API_KEY);
        // Set up OpenAI client
        this.client = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY, // Assumes API key is in environment
        });
    }
    // Method to execute agent's goal with LLM (OpenAI API Call)
    executeGoal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            // System prompt for OpenAI
            const systemPrompt = `You are ${this.name}, a ${this.role}. ${this.backstory ? 'Backstory: ' + this.backstory : ''}`;
            if (!process.env.OPENAI_API_KEY) {
                throw new Error("OpenAI API key not set in environment variables.");
            }
            if (this.verbose) {
                console.log(`${this.name} (Role: ${this.role}) is executing goal: ${this.goal} using LLM: ${this.llm}`);
            }
            try {
                const response = yield this.client.chat.completions.create({
                    model: this.llm,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: this.goal }
                    ],
                });
                const result = (_e = (_d = (_c = (_b = (_a = response.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.trim()) !== null && _e !== void 0 ? _e : 'No content';
                return `Executed goal "${this.goal}" with result: ${result}`;
            }
            catch (error) {
                console.error('Error executing goal with OpenAI:', error);
                throw new Error("Failed to execute goal with the language model.");
            }
        });
    }
    // Communication method
    communicate(message) {
        if (this.verbose) {
            console.log(`${this.name} says: ${message}`);
        }
    }
}
exports.Agent = Agent;
