# Tempo MCP Server

A Model Context Protocol (MCP) server for logging work time directly to Jira tickets. This server provides tools for creating and managing work logs through the MCP interface, enabling seamless time tracking integration with AI assistants and development tools.

## Overview

The Tempo MCP Server is designed to integrate with AI assistants and development tools to enable work time logging functionality directly to Jira. It allows users to create work logs with ticket IDs, time spent, and descriptions that will be automatically logged to the corresponding Jira tickets through the Tempo API.

**Note**: This is currently a demo version that stores work logs locally in JSON format. The production version will integrate with Jira's Tempo API to create actual work logs in Jira tickets.

## Features

- **Work Log Creation**: Create new work logs with ticket ID, time spent, and description
- **Jira Integration**: Direct integration with Jira's Tempo API for automatic work log creation
- **MCP Integration**: Full Model Context Protocol compliance for seamless AI assistant integration
- **TypeScript Support**: Built with TypeScript for type safety and better development experience
- **Demo Mode**: Local JSON storage for testing and development (current implementation)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tempo-mcp
```

2. Install dependencies:

```bash
npm install
```

## Usage

### Development Mode

Run the server in development mode:

```bash
npm run server:dev
```

### Build and Run

Build the TypeScript code:

```bash
npm run server:build
```

### Inspector Mode

Run with MCP inspector for debugging:

```bash
npm run server:inspect
```

## API Reference

### Tools

#### `create-work-log`

Creates a new work log entry.

**Parameters:**

- `ticketId` (string): The ticket or issue ID
- `time` (number): Time spent in hours/minutes
- `description` (string): Description of the work performed

**Example:**

```json
{
  "ticketId": "PROJ-123",
  "time": 2.5,
  "description": "Implemented user authentication feature"
}
```

## Data Structure

### Demo Mode (Current)

Work logs are stored locally in `src/data/workLog.json` with the following structure:

```json
[
  {
    "id": 1,
    "ticketId": "1234567890",
    "time": 10,
    "description": "Work log description"
  }
]
```

### Production Mode (Planned)

Work logs will be created directly in Jira using the Tempo API. The data structure will map to Tempo's work log format:

```json
{
  "issueId": "1234567890",
  "timeSpentSeconds": 36000,
  "comment": "Work log description",
  "started": "2024-01-01T09:00:00.000+0000"
}
```

## Configuration

The server is configured with the following capabilities:

- **Name**: Tempo MCP Server
- **Version**: 1.0.0
- **Transport**: StdioServerTransport
- **Capabilities**: Tools, Resources, Prompts

## Development

### Project Structure

```
src/
├── server.ts          # Main server implementation
└── data/
    └── workLog.json   # Demo work log storage (local JSON)
```

### Dependencies

- `@modelcontextprotocol/sdk`: MCP SDK for server implementation
- `zod`: Schema validation
- `tsx`: TypeScript execution for development
- `typescript`: TypeScript compiler

### Future Dependencies (Production)

- `@atlassian/tempo-api-client`: Official Tempo API client
- `axios` or `fetch`: HTTP client for API calls
- `dotenv`: Environment variable management

### Scripts

- `server:dev`: Run server in development mode
- `server:build`: Build TypeScript code
- `server:build:watch`: Build with watch mode
- `server:inspect`: Run with MCP inspector

### Roadmap

- [ ] Integrate with Jira Tempo API
- [ ] Add authentication and configuration management
- [ ] Implement work log retrieval and management
- [ ] Add support for different time formats
- [ ] Add error handling and validation
- [ ] Implement work log updates and deletions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

ISC License - see package.json for details

## Author

Kiet Huynh

## Support

For issues and questions, please create an issue in the repository or contact the maintainer.
