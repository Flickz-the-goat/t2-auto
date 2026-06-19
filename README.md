# t2-auto
Fully function AI Workflow builder app with basic capabilties

0Auth - Authentication
BullMQ Workers - Workflow execution
React Flow - Workflow builder 
ngrok - webhook management 

Easily build simple workflows, that can be triggered manually or via webhooks. easily connect your AI model into your workflow to generate plain text, json or images. Additionally, send emails with your acccount using your workflows. Supports variable calling from universal workflow execution via {}. Example {{httpRequest-0.status}}. 

Architecture:
Each workflow can have multiple versions, where each version instance in ran on a specified execution (currExecution). This allows for isolated node execution testing, great for debugging and developement. Each node has a config panel, in which the input, config and output is displayed. Input can be customized for testing purposes. 
