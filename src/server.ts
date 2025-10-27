import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs/promises";

const server = new McpServer({
  name: "Tempo MCP Server",
  version: "1.0.0",
  description: "Tempo MCP Server",
  capabilities: {
    resrouces: {},
    tools: {},
    prompts: {},
  },
});

server.registerTool(
  "create-work-log",
  {
    title: "Create Work Log",
    description: "Create a new work log",
    inputSchema: {
      ticketId: z.string(),
      time: z.number(),
      description: z.string(),
    },
    annotations: {
      title: "Create Work Log",
      readonlyHint: true,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  },
  async (params) => {
    try {
      const id = await createWorkLog(params);
      return {
        content: [{ type: "text", text: `Work log created successfully` }],
        structuredContent: { message: `Work log created successfully` },
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Failed to create work log` }],
        structuredContent: { message: `Failed to create work log` },
      };
    }
  }
);

async function createWorkLog(workLog: {
  ticketId: string;
  time: number;
  description: string;
}) {
  const workLogs = await import("./data/workLog.json", {
    with: { type: "json" },
  }).then((module) => module.default);

  const id = workLogs.length + 1;
  workLogs.push({ id, ...workLog });
  await fs.writeFile(
    "./src/data/workLog.json",
    JSON.stringify(workLogs, null, 2)
  );
  return id;
}

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

main();
