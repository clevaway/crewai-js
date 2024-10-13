// Import the necessary classes from the library
const { Agent, Task, Crew } = require('crewai-js');

// Create an Agent with a detailed backstory
const agent = new Agent({
    name: 'Alice',
    role: 'Content writer',
    goal: 'Write a compelling blog post about the recent advancements in AI, particularly in the development of large language models (LLMs) like GPT-4.',
    backstory: 'You are a seasoned content writer with a passion for technology and AI. You have been writing in the tech industry for the past decade, specializing in emerging technologies like artificial intelligence and machine learning. You understand complex technical topics and can translate them into engaging and informative content for a broad audience.',
    llm: 'gpt-3.5-turbo', // Optional, default is GPT-4
    verbose: true
});

// Create a Task with a detailed description
const task = new Task({
    description: 'Write a blog post discussing the advancements in AI, focusing on how large language models (LLMs) like GPT-4 are transforming industries, improving natural language understanding, and enabling new applications across sectors.',
    agent: agent,
    outputFormat: 'raw'
});

// Create a Crew and add the task
const crew = new Crew({
    name: 'AI Blog Writing Crew',
    agents: [agent],
    tasks: [task],
    verbose: true
});

// Kickoff the task execution
crew.kickoff();
