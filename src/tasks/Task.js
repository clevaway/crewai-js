"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor({ description, agent, outputFormat = 'raw', async = false }) {
        this.description = description;
        this.agent = agent;
        this.outputFormat = outputFormat;
        this.async = async;
    }
    // Method to execute the task
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.async) {
                return new Promise((resolve) => {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        const result = yield this.agent.executeGoal();
                        resolve(this.formatOutput(result));
                    }), 1000); // Simulate async delay
                });
            }
            else {
                const result = yield this.agent.executeGoal();
                return this.formatOutput(result);
            }
        });
    }
    // Method to format task output
    formatOutput(output) {
        if (this.outputFormat === 'json') {
            return JSON.stringify({ result: output });
        }
        return output;
    }
}
exports.Task = Task;
