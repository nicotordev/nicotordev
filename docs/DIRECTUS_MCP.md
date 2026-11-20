================================================
FILE: readme.md
================================================
# Directus Content MCP Server

The [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is a standard for helping AI tools and
LLMs talk to applications and services like Directus.

The Directus Content MCP Server is an interface for Directus users to interact with their data in LLMs. Some good use
cases are:

- **Content Editors**: build custom pages, write blog posts, update content, organize assets and more inside your
  Directus project.
- **Data Analysts**: query collections, generate reports, analyze trends, and extract insights from your Directus data
  using natural language.

It intentionally limits destructive actions that would result in really bad outcomes like data loss from deleting fields
or deleting collections.

We plan to provide more tools for developers who are working with local / development Directus projects in future
releases and potentially as a separate package to help further prevent data loss.

## Installation

### Prerequisites

- An existing Directus project

If you don't have an existing Directus project, you can get started with a free trial on
[Directus Cloud](https://directus.cloud/register) at https://directus.cloud/register

OR

You can spin up a sample Directus instance locally with the following terminal command.

```
npx directus-template-cli@latest init
```

### Step 1. Get Directus Credentials

You can use email and password or generate a static token to connect the MCP to your Directus instance.

To get a static access token:

1. Login to your Directus instnace
2. Go to the User Directory and choose your own user profile
3. Scroll down to the Token field
4. Generate token and copy it
5. Save the user (do NOT forget to save because you’ll get an error that shows Invalid token!)

### Step 2. Configure the MCP in your AI Tool

#### Claude Desktop

1. Open [Claude Desktop](https://claude.ai/download) and navigate to Settings.

2. Under the Developer tab, click Edit Config to open the configuration file.

3. Add the following configuration:

   ```json
   {
   	"mcpServers": {
   		"directus": {
   			"command": "npx",
   			"args": ["@directus/content-mcp@latest"],
   			"env": {
   				"DIRECTUS_URL": "https://your-directus-url.com",
   				"DIRECTUS_TOKEN": "your-directus-token>"
   			}
   		}
   	}
   }
   ```

   or if you're using email and password

   ```json
   {
   	"mcpServers": {
   		"directus": {
   			"command": "npx",
   			"args": ["@directus/content-mcp@latest"],
   			"env": {
   				"DIRECTUS_URL": "https://your-directus-url.com",
   				"DIRECTUS_USER_EMAIL": "john@example.com",
   				"DIRECTUS_USER_PASSWORD": "your-password"
   			}
   		}
   	}
   }
   ```
   Make sure you replace the placeholder values with your URL and credentials.

4. Save the configuration file and restart Claude desktop.

5. From the new chat screen, you should see an icon appear with the Directus MCP server.

#### Cursor

1. Open [Cursor](https://docs.cursor.com/context/model-context-protocol) and create a .cursor directory in your project
   root if it doesn't exist.

2. Create a `.cursor/mcp.json` file if it doesn't exist and open it.

3. Add the following configuration:

   ```json
   {
   	"mcpServers": {
   		"directus": {
   			"command": "npx",
   			"args": ["@directus/content-mcp@latest"],
   			"env": {
   				"DIRECTUS_URL": "https://your-directus-url.com",
   				"DIRECTUS_TOKEN": "your-directus-token>"
   			}
   		}
   	}
   }
   ```

   or if you're using email and password

   ```json
   {
   	"mcpServers": {
   		"directus": {
   			"command": "npx",
   			"args": ["@directus/content-mcp@latest"],
   			"env": {
   				"DIRECTUS_URL": "https://your-directus-url.com",
   				"DIRECTUS_USER_EMAIL": "john@example.com",
   				"DIRECTUS_USER_PASSWORD": "your-password"
   			}
   		}
   	}
   }
   ```

   Make sure you replace the placeholder values with your URL and credentials.

4. Save the configuration file.

5. Open Cursor and navigate to Settings/MCP. You should see a green active status after the server is successfully
   connected.

## Tools

The MCP Server provides the following tools to interact with your Directus instance:

| Tool                 | Description                                          | Use Cases                                                      |
| -------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| **system-prompt**    | Provides context to the LLM assistant about its role | Start of a session to understand the system context            |
| **users-me**         | Get current user information                         | Understanding permissions, personalizing responses             |
| **read-collections** | Retrieve the schema of all collections               | Exploring database structure, understanding relationships      |
| **read-items**       | Fetch items from any collection                      | Retrieving content, searching for data, displaying information |
| **create-item**      | Create new items in collections                      | Adding new content, records, or entries                        |
| **update-item**      | Modify existing items                                | Editing content, updating statuses, correcting information     |
| **delete-item**      | Remove items from collections                        | Cleaning up outdated content                                   |
| **read-files**       | Access file metadata or raw content                  | Finding images, documents, or media assets                     |
| **import-file**      | Import files from URLs                               | Adding external media to your Directus instance                |
| **update-files**     | Update file metadata                                 | Organizing media, adding descriptions, tagging                 |
| **read-fields**      | Get field definitions for collections                | Understanding data structure, field types and validation       |
| **read-field**       | Get specific field information                       | Detailed field configuration                                   |
| **create-field**     | Add new fields to collections                        | Extending data models                                          |
| **update-field**     | Modify existing fields                               | Changing field configuration, interface options                |
| **read-flows**       | List available automation flows                      | Finding automation opportunities                               |
| **trigger-flow**     | Execute automation flows                             | Bulk operations, publishing, status changes                    |
| **read-comments**    | View comments on items                               | Retrieving feedback, viewing discussion threads                |
| **upsert-comment**   | Add or update comments                               | Providing feedback, documenting decisions                      |
| **markdown-tool**    | Convert between markdown and HTML                    | Content formatting for WYSIWYG fields                          |
| **get-prompts**      | List available prompts                               | Discovering pre-configured prompt templates                    |
| **get-prompt**       | Execute a stored prompt                              | Using prompt templates for consistent AI interactions          |

### System Prompt

The MCP server comes with a system prompt that helps encourage the right tool use and provides guiderails for the LLM.
You can overwrite the default system prompt in your env configuration by setting the `MCP_SYSTEM_PROMPT` variable.

You can also disable the system prompt entirely if desired.

Just set `MCP_SYSTEM_PROMPT_ENABLED` to `false`

### Prompt Configuration

The MCP server supports dynamic prompts stored in a Directus collection. Prompts are not widely supported across MCP
Clients, but Claude Desktop does have support for them.

You can configure the following:

- `DIRECTUS_PROMPTS_COLLECTION_ENABLED`: Set to "true" to enable prompt functionality
- `DIRECTUS_PROMPTS_COLLECTION`: The name of the collection containing prompts
- `DIRECTUS_PROMPTS_NAME_FIELD`: Field name for the prompt name (default: "name")
- `DIRECTUS_PROMPTS_DESCRIPTION_FIELD`: Field name for the prompt description (default: "description")
- `DIRECTUS_PROMPTS_SYSTEM_PROMPT_FIELD`: Field name for the system prompt text (default: "system_prompt")
- `DIRECTUS_PROMPTS_MESSAGES_FIELD`: Field name for the messages array (default: "messages")

### Mustache Templating

Both system prompts and message content support mustache templating using the `{{ variable_name }}` syntax:

1. Define variables in your prompts using double curly braces: `Hello, {{ name }}!`
2. When calling a prompt, provide values for the variables in the `arguments` parameter
3. The MCP server will automatically replace all variables with their provided values

## Local / Dev Installation

1. Clone the repo
2. `pnpm install && pnpm build` to build the server
3. Configure Claude Desktop or Cursor like above, but pointing it to the `dist` file instead:
4. Use `pnpm dev` to watch for changes and rebuild the server

```json
{
	"mcpServers": {
		"directus": {
			"command": "node",
			"args": ["/path/to/directus-mcp-server/dist/index.js"]
		}
	}
}
```

Sample Claude Desktop Config for local dev with full settings

```json
{
	"mcpServers": {
		"directus": {
			"command": "node",
			"args": [
				"/path/to/directus-mcp-server/dist/index.js"
			],
			"env": {
				"DIRECTUS_URL": "DIRECTUS_URL",
				"DIRECTUS_TOKEN": "DIRECTUS_TOKEN",
				"MCP_SYSTEM_PROMPT_ENABLED": "true",
				"MCP_SYSTEM_PROMPT": "You're a content editor working at Directus.\nYou're a master at copywriting and creating messaging that resonates with technical audiences.\nYou'll be given details about a Directus instance and the schema within it. You'll be asked to update content and other helpful tasks. **Rules** \n - If you're updating HTML / WYSWIG fields inside the CMS - DO NOT ADD extra styling, classes, or markup outside the standard HTML elements. If you're not 95% sure what values should go into a certain field, stop and ask the user. Before deleting anything, confirm with the user and prompt them for an explicit DELETE confirmation via text.",
				"DIRECTUS_PROMPTS_COLLECTION_ENABLED": "true",
				"DIRECTUS_PROMPTS_COLLECTION": "ai_prompts"
			}
		}
	}
}
```

### Example Configurations

#### Basic Configuration with Token

```json
{
	"mcpServers": {
		"directus": {
			"command": "npx",
			"args": ["@directus/content-mcp@latest"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-instance.com",
				"DIRECTUS_TOKEN": "your_directus_token"
			}
		}
	}
}
```

#### Configuration with Email/Password Authentication

```json
{
	"mcpServers": {
		"directus": {
			"command": "npx",
			"args": ["@directus/content-mcp@latest"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-instance.com",
				"DIRECTUS_USER_EMAIL": "user@example.com",
				"DIRECTUS_USER_PASSWORD": "your_password"
			}
		}
	}
}
```

#### Advanced Configuration with Custom System Prompt and Tool Restrictions

```json
{
	"mcpServers": {
		"directus": {
			"command": "npx",
			"args": ["@directus/content-mcp@latest"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-instance.com",
				"DIRECTUS_TOKEN": "your_directus_token",
				"DISABLE_TOOLS": ["delete-item", "update-field"],
				"MCP_SYSTEM_PROMPT_ENABLED": "true",
				"MCP_SYSTEM_PROMPT": "You are an assistant specialized in managing content for our marketing website.",
				"DIRECTUS_PROMPTS_COLLECTION_ENABLED": "true",
				"DIRECTUS_PROMPTS_COLLECTION": "ai_prompts",
				"DIRECTUS_PROMPTS_NAME_FIELD": "name",
				"DIRECTUS_PROMPTS_DESCRIPTION_FIELD": "description",
				"DIRECTUS_PROMPTS_SYSTEM_PROMPT_FIELD": "system_prompt",
				"DIRECTUS_PROMPTS_MESSAGES_FIELD": "messages"
			}
		}
	}
}
```

# ❤️ Contributing

We love to see community contributions, but please open an issue first to discuss proposed changes before submitting any
PRs.

## 🙏 Thanks To

This started as an experiment by the dude, the legend, the [@rijkvanzanten](https://github.com/rijkvanzanten) 🙌

## License

MIT



================================================
FILE: eslint.config.js
================================================
import directusConfig from '@directus/eslint-config';

export default [
	...directusConfig,
	{
		rules: {
			'n/prefer-global/process': 'off',
		},
	},
];



================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2025 Directus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: package.json
================================================
{
	"name": "@directus/content-mcp",
	"type": "module",
	"version": "0.1.0",
	"packageManager": "pnpm@10.4.1",
	"description": "Model Context Protocol server for Directus projects.",
	"contributors": [
		"Rijk van Zanten  <rijkvanzanten@me.com>",
		"Bryant Gillespie"
	],
	"license": "MIT",
	"keywords": [
		"ai",
		"directus",
		"mcp",
		"modelcontextprotocol"
	],
	"main": "dist/index.js",
	"bin": {
		"directus-mcp-server": "./dist/index.js"
	},
	"scripts": {
		"prepare": "pnpm build",
		"build": "tsc --project tsconfig.json",
		"dev": "tsc --project tsconfig.json --watch & node --watch dist/index.js",
		"start": "node dist/index.js",
		"lint": "eslint .",
		"lint:fix": "eslint --fix ."
	},

	"dependencies": {
		"@directus/sdk": "19.1.0",
		"@modelcontextprotocol/sdk": "1.10.2",
		"dotenv": "16.5.0",
		"isomorphic-dompurify": "^2.24.0",
		"marked": "^15.0.11",
		"zod": "4.0.0-beta.20250424T163858"
	},
	"devDependencies": {
		"@directus/eslint-config": "^0.1.0",
		"@directus/tsconfig": "3.0.0",
		"@directus/types": "^13.1.0",
		"@types/node": "22.15.3",
		"eslint": "^9.25.1",
		"typescript": "5.8.3"
	}
}



================================================
FILE: tsconfig.json
================================================
{
	"extends": "@directus/tsconfig/node22",
	"compilerOptions": {
		"outDir": "dist"
	},
	"include": ["src"]
}



================================================
FILE: .editorconfig
================================================
root=true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
trim_trailing_whitespace = true

[*.{mjs,cjs,js,mts,cts,ts,json,vue,html,scss,css,toml,md}]
indent_style = tab

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml}]
indent_style = space


================================================
FILE: src/config.ts
================================================
import dotenv from 'dotenv';
import * as z from 'zod';
import { DEFAULT_SYSTEM_PROMPT } from './constants/default-prompts.js';
import { nullableString } from './types/common.js';

const configSchema = z
	.object({
		DIRECTUS_URL: z.string().describe('The URL of the Directus instance.'),
		DIRECTUS_TOKEN: nullableString().describe(
			'The user token for the Directus instance.',
		),
		DIRECTUS_USER_EMAIL: nullableString().describe(
			'The email of the user to login with.',
		),
		DIRECTUS_USER_PASSWORD: nullableString().describe(
			'The password of the user to login with.',
		),
		DISABLE_TOOLS: z
			.array(z.string())
			.default(['delete-item'])
			.describe("Disable specific tools by name. Defaults to ['delete-item']"),
		MCP_SYSTEM_PROMPT_ENABLED: z
			.string()
			.optional()
			.default('true')
			.describe('Enable a tailored system prompt for the MCP server.'),
		MCP_SYSTEM_PROMPT: nullableString().describe(
			'Overwrite the default system prompt for the MCP server. Will load into the context before you use any other Directus tools.',
		).default(DEFAULT_SYSTEM_PROMPT),
		DIRECTUS_PROMPTS_COLLECTION_ENABLED: z
			.string()
			.optional()
			.default('false')
			.describe('Enable MCP prompts.'),
		DIRECTUS_PROMPTS_COLLECTION: nullableString().describe(
			'The Directus collection to store LLM prompts in.',
		),
		DIRECTUS_PROMPTS_NAME_FIELD: nullableString().default('name').describe(
			'The name of the field that contains the prompt name.',
		),
		DIRECTUS_PROMPTS_DESCRIPTION_FIELD: nullableString().default('description').describe(
			'The name of the field that contains the prompt description.',
		),
		DIRECTUS_PROMPTS_SYSTEM_PROMPT_FIELD: nullableString().default('system_prompt').describe(
			'The name of the field that contains the prompt.',
		),
		DIRECTUS_PROMPTS_MESSAGES_FIELD: nullableString().default('messages').describe(
			'The name of the field that contains the prompt messages.',
		),
	})
	.refine(
		(data) => {
			return (
				!!data.DIRECTUS_TOKEN
				|| (!!data.DIRECTUS_USER_EMAIL && !!data.DIRECTUS_USER_PASSWORD)
			);
		},
		{
			message:
				'Either DIRECTUS_TOKEN or both DIRECTUS_USER_EMAIL and DIRECTUS_USER_PASSWORD must be provided.',
			path: ['DIRECTUS_TOKEN'],
		},
	);

export const createConfig = () => {
	dotenv.config();

	return configSchema.parse(process.env);
};

export type Config = z.infer<typeof configSchema>;



================================================
FILE: src/directus.ts
================================================
import type {
	AuthenticationClient,
	DirectusClient,
	RestClient,
} from '@directus/sdk';
import type { Config } from './config.js';
import type { Schema } from './types/schema.js';
import {
	authentication,
	createDirectus as createSdk,
	rest,
} from '@directus/sdk';

export type Directus = DirectusClient<Schema> &
	RestClient<Schema> &
	AuthenticationClient<Schema>;

/**
 * Create a Directus client.
 * @param config - The configuration.
 * @returns The Directus client.
 */
export const createDirectus = (config: Config) =>
	createSdk(config.DIRECTUS_URL).with(authentication()).with(rest());

/**
 * Authenticate the Directus client.
 * @param directus - The Directus client.
 * @param config - The configuration.
 */
export async function authenticateDirectus(directus: Directus, config: Config) {
	if (!directus || !config) {
		throw new Error('Directus or config is not defined');
	}

	// Token-based authentication
	if (config.DIRECTUS_TOKEN) {
		directus.setToken(config.DIRECTUS_TOKEN);
		return;
	}

	// Credentials-based authentication
	if (config.DIRECTUS_USER_EMAIL && config.DIRECTUS_USER_PASSWORD) {
		try {
			await directus.login(
				config.DIRECTUS_USER_EMAIL,
				config.DIRECTUS_USER_PASSWORD,
			);

			return;
		}
		catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			throw new Error(
				`Failed to authenticate with credentials: ${errorMessage}`,
			);
		}
	}

	// No valid authentication method
	throw new Error(
		'No valid authentication method provided (requires either DIRECTUS_TOKEN or both DIRECTUS_USER_EMAIL and DIRECTUS_USER_PASSWORD)',
	);
}



================================================
FILE: src/index.ts
================================================
#!/usr/bin/env node
import type { CallToolRequest } from '@modelcontextprotocol/sdk/types.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
	CallToolRequestSchema,
	GetPromptRequestSchema,
	ListPromptsRequestSchema,
	ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { createConfig } from './config.js';
import { authenticateDirectus, createDirectus } from './directus.js';
import { getAvailablePrompts, handleGetPrompt } from './prompts/handlers.js';
import { fetchPrompts } from './prompts/index.js';
import { getTools } from './tools/index.js';
import { fetchSchema } from './utils/fetch-schema.js';
import { toMpcTools } from './utils/to-mpc-tools.js';

async function main() {
	const config = createConfig();
	const directus = createDirectus(config);
	await authenticateDirectus(directus, config);
	const schema = await fetchSchema(directus);
	const prompts = await fetchPrompts(directus, config, schema);
	const availableTools = getTools(config);

	const server = new Server(
		{
			name: 'Directus MCP Server',
			version: '0.0.1',
		},
		{
			capabilities: {
				tools: {},
				resources: {},
				prompts: {},
			},
		},
	);

	// Manage prompts
	server.setRequestHandler(ListPromptsRequestSchema, async () => {
		return {
			prompts: getAvailablePrompts(prompts),
		};
	});

	// Get specific prompt
	server.setRequestHandler(GetPromptRequestSchema, async (request) => {
		const promptName = request.params.name;
		const args = request.params.arguments || {};

		return await handleGetPrompt(
			directus,
			config,
			promptName,
			args,
		);
	});

	// Manage tool requests
	server.setRequestHandler(
		CallToolRequestSchema,
		async (request: CallToolRequest) => {
			try {
				// Find the tool definition among ALL tools
				const tool = availableTools.find((definition) => {
					return definition.name === request.params.name;
				});

				if (!tool) {
					throw new Error(`Unknown tool: ${request.params.name}`);
				}

				// Proceed with execution if permission check passes
				const { inputSchema, handler } = tool;
				const args = inputSchema.parse(request.params.arguments);
				return await handler(directus, args, { schema, baseUrl: config.DIRECTUS_URL });
			}
			catch (error) {
				console.error('Error executing tool:', error);
				const errorMessage =
					error instanceof Error ? error.message : JSON.stringify(error);

				return {
					content: [
						{
							type: 'text',
							text: errorMessage,
						},
					],
					isError: true,
				};
			}
		},
	);

	// Return the pre-filtered list for listing purposes
	server.setRequestHandler(ListToolsRequestSchema, async () => {
		return { tools: toMpcTools(availableTools) };
	});

	const transport = new StdioServerTransport();

	await server.connect(transport);
}

try {
	await main();
}
catch (error) {
	console.error('Fatal error in main():', error);
	process.exit(1);
}



================================================
FILE: src/constants/default-prompts.ts
================================================
export const DEFAULT_SYSTEM_PROMPT = `
## Core Identity
- You are Directus Assistant, a powerful AI assistant and world-class content editor specialized in working with Directus CMS.

# Instructions
You are always up-to-date with the latest content management practices and technical copywriting techniques.
Your responses should be precise, helpful, and tailored to technical audiences while maintaining clarity.
You'll be given details about a Directus instance and its schema to help users manage their content effectively.

# Capabilities

You have access to a Directus instance and can analyze the schema and content within it. Here are your key capabilities:

- Understanding and working with Directus schema structures
- Content editing and optimization for technical audiences
- HTML/WYSIWYG field editing
- Expert copywriting for technical documentation

## Working with Directus

You'll analyze prompts containing:
- "system prompt" (your guidelines)
- "user" (the input query)
- "assistant" (expected output, which may often be blank)

## Content Editing Rules

1. When editing HTML/WYSIWYG fields:
    - Use ONLY standard HTML elements
    - NEVER add extra styling, classes, or markup outside standard HTML elements
    - Focus on semantic, clean markup

2. Field Value Certainty:
    - IMPORTANT. IF you're less than 99% certain about values for specific fields, STOP AND ASK THE USER
    - Prioritize ACCURACY over ASSUMPTION

3. Content Deletion:
    - Before deleting any content, confirm with the user
    - Require explicit "DELETE" confirmation via text
    - Always explain potential impacts of deletion

## Technical Communication

1. Craft messaging that resonates with technical audiences:
    - Use appropriate terminology for Directus and CMS concepts
    - Balance technical precision with clarity and readability
    - Prioritize accuracy in all communications

2. Response Format:
    - Provide clear, concise responses focused on the task at hand
    - Ask clarifying questions when needed to ensure accuracy
    - Confirm understanding before making significant changes

# Important Restrictions

- NEVER add styling beyond standard HTML elements
- ALWAYS confirm before deleting anything
- ALWAYS ask for clarification when uncertain
- NEVER modify schema or system fields without explicit permission
- NEVER suggest changes that would compromise data integrity
`;



================================================
FILE: src/prompts/handlers.ts
================================================
import type { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import type { Config } from '../config.js';
import type { Directus } from '../directus.js';
import type { McpPrompt } from './index.js';
import { createPromptResult } from '../utils/prompt-helpers.js';
import { fetchPromptByName } from './index.js';

/**
 * Handler for get-prompt requests. Fetches the prompt from Directus and processes it.
 * @param directus - The Directus client
 * @param config - The application configuration
 * @param promptName - The name of the prompt to fetch
 * @param args - The arguments to apply to the prompt template
 * @returns The processed prompt result
 */
export async function handleGetPrompt(
	directus: Directus,
	config: Config,
	promptName: string,
	args: Record<string, any> = {},
): Promise<GetPromptResult> {
	const promptItem = await fetchPromptByName(directus, config, promptName);

	if (!promptItem) {
		throw new Error(`Prompt not found: ${promptName}`);
	}

	// Ensure messages is an array, even if empty
	const messages = promptItem.messages || [];
	return createPromptResult(messages, args, promptItem.systemPrompt);
}

/**
 * Returns all available prompts from Directus
 * @param prompts - Record of prompt name to prompt definition
 * @returns An array of MCP prompt definitions
 */
export function getAvailablePrompts(prompts: Record<string, McpPrompt>): McpPrompt[] {
	return Object.values(prompts);
}



================================================
FILE: src/prompts/index.ts
================================================
import type { Config } from '../config.js';
import type { Directus } from '../directus.js';
import type { Schema } from '../types/schema.js';
import { readItems } from '@directus/sdk';
import { extractMustacheVariables } from '../utils/prompt-helpers.js';

export interface PromptItem {
	id: string;
	name: string;
	description: string;
	systemPrompt: string;
	messages: Array<{
		role: 'user' | 'assistant';
		text: string;
	}>;
}

export interface McpPrompt {
	name: string;
	description: string;
	arguments: Array<{
		name: string;
		description: string;
		required: boolean;
	}>;
}

/**
 * Fetches prompts from the Directus collection specified in the config
 * @param directus - The Directus client
 * @param config - The application config
 * @returns A map of prompt name to MCP prompt definition
 */
export async function fetchPrompts(
	directus: Directus,
	config: Config,
	schema: Schema,
): Promise<Record<string, McpPrompt>> {
	// If no prompts collection is configured, return an empty object
	if (!config.DIRECTUS_PROMPTS_COLLECTION) {
		console.error('No prompts collection configured, skipping prompt fetching');
		return {};
	}

	// If the prompts collection isn't in the schema, then throw an error because there's a permissions issue or it doesn't exist
	if (!schema[config.DIRECTUS_PROMPTS_COLLECTION]) {
		throw new Error(
			'Prompts collection not found in the schema. Use the read-collections tool first. If you have already used the read-collections tool, then check the permissions of the user you are using to fetch prompts.',
		);
	}

	console.error('config', config);

	// Check the prompts collection has the required fields
	const requiredFields = [
		config.DIRECTUS_PROMPTS_NAME_FIELD,
		config.DIRECTUS_PROMPTS_DESCRIPTION_FIELD,
		config.DIRECTUS_PROMPTS_SYSTEM_PROMPT_FIELD,
		config.DIRECTUS_PROMPTS_MESSAGES_FIELD,
	];

	for (const field of requiredFields) {
		if (!schema[config.DIRECTUS_PROMPTS_COLLECTION]?.[field as keyof typeof schema[string]]) {
			throw new Error(`Prompt field ${field} not found in the prompts collection.`);
		}
	}

	try {
		type DirectusCollection = any;

		const response = (await directus.request(
			// @ts-expect-error - We're using a dynamic collection name
			readItems(config.DIRECTUS_PROMPTS_COLLECTION),
		)) as DirectusCollection[];

		const prompts: Record<string, McpPrompt> = {};

		for (const item of response) {
			// Still include prompts even if messages are empty or null
			const variables = new Set<string>();
			const messagesField = config.DIRECTUS_PROMPTS_MESSAGES_FIELD as string;
			const systemPromptField = config.DIRECTUS_PROMPTS_SYSTEM_PROMPT_FIELD as string;

			// Extract variables from system prompt if it exists
			if (item[systemPromptField]) {
				for (const variable of extractMustacheVariables(item[systemPromptField])) {
					variables.add(variable);
				}
			}

			// Extract variables from messages if they exist
			if (item[messagesField] && Array.isArray(item[messagesField])) {
				for (const message of item[messagesField]) {
					if (message && message.text) {
						for (const variable of extractMustacheVariables(message.text)) {
							variables.add(variable);
						}
					}
				}
			}

			prompts[item.name] = {
				name: item.name,
				description: item.description || `Prompt: ${item.name}`,
				arguments: [...variables].map((name) => ({
					name,
					description: `Value for ${name}`,
					required: false,
				})),
			};
		}

		return prompts;
	}
	catch (error) {
		console.error('Error fetching prompts:', error);
		return {};
	}
}

/**
 * Fetches a specific prompt by name from Directus
 * @param directus - The Directus client
 * @param config - The application config
 * @param promptName - The name of the prompt to fetch
 * @returns The prompt item if found, undefined otherwise
 */
export async function fetchPromptByName(
	directus: Directus,
	config: Config,
	promptName: string,
): Promise<PromptItem | undefined> {
	if (!config.DIRECTUS_PROMPTS_COLLECTION) return undefined;

	try {
		type DirectusCollection = any;

		const response = (await directus.request(
			// @ts-expect-error - We're using a dynamic collection name
			readItems(config.DIRECTUS_PROMPTS_COLLECTION, {
				filter: {
					[config.DIRECTUS_PROMPTS_NAME_FIELD as string]: {
						_eq: promptName,
					},
				},
				limit: 1,
			}),
		)) as DirectusCollection[];

		if (!response || response.length === 0) return undefined;

		// Map Directus item to our expected format
		const item = response[0];
		const nameField = config.DIRECTUS_PROMPTS_NAME_FIELD as string;
		const descriptionField = config.DIRECTUS_PROMPTS_DESCRIPTION_FIELD as string;
		const systemPromptField = config.DIRECTUS_PROMPTS_SYSTEM_PROMPT_FIELD as string;
		const messagesField = config.DIRECTUS_PROMPTS_MESSAGES_FIELD as string;

		return {
			id: item.id,
			name: item[nameField],
			description: item[descriptionField],
			systemPrompt: item[systemPromptField] || '',
			messages: item[messagesField] || [],
		};
	}
	catch (error) {
		console.error(`Error fetching prompt ${promptName}:`, error);
		return undefined;
	}
}



================================================
FILE: src/tools/comments.ts
================================================
import { createComment, readComments, updateComment } from '@directus/sdk';

import * as z from 'zod';
import { itemQuerySchema } from '../types/query.js';
import { defineTool } from '../utils/define.js';
import { formatErrorResponse, formatSuccessResponse } from '../utils/response.js';

export const readCommentsTool = defineTool('read-comments', {
	description: 'Fetch comments from any Directus collection item.',
	annotations: {
		title: 'Read Comments',
		readOnlyHint: true,
	},
	inputSchema: z.object({
		query: itemQuerySchema.describe(
			'Directus query parameters (filter, sort, fields, limit, etc.)',
		),
	}),
	handler: async (directus, query) => {
		try {
			const { query: queryParams } = query;
			const result = await directus.request(
				readComments(queryParams),
			);
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const upsertCommentTool = defineTool('upsert-comment', {
	description: `Create or update a comment on a collection item. When mentioning users:
	1. First use the read-users tool to retrieve the user's ID
	2. Then format the mention using the exact syntax: @[user-uuid]
	3. Include this formatted mention within your comment text
	Example: "Hey @8cc67ebc-3c52-475a-9ae6-fba26963a9ad, can you take a look at this?"
	IMPORTANT: User mentions MUST use the exact pattern @uuid without any additional characters or formatting. Keep all comments brief and to the point - no more than 2-3 sentences when possible. Focus on essential information only.`,
	annotations: {
		title: 'Create or Update Comment',
		readOnlyHint: true,
	},
	inputSchema: z.object({
		id: z.string().optional().describe('The id of the comment to update. If not provided, a new comment will be created.'),
		collection: z.string().describe('The name of the collection the item belongs to'),
		item: z.union([z.string(), z.number()]).describe('The primary key of the item to comment on.'),
		comment: z.string().describe('The comment text.'),
	}),
	handler: async (directus, input) => {
		try {
			const { collection, item, comment, id } = input;

			const result = await (id
				? directus.request(
						updateComment(id, {
							collection,
							item,
							comment,
						}),
					)
				: directus.request(
						createComment({
							collection,
							item,
							comment,
						}),
					));

			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});



================================================
FILE: src/tools/fields.ts
================================================
import {
	createField,
	readField,
	readFields,
	readFieldsByCollection,
	updateField,
} from '@directus/sdk';
import * as z from 'zod';
import {
	CreateFieldDataSchema,
	UpdateFieldDataSchema,
} from '../types/fields.js';
import { defineTool } from '../utils/define.js';
import {
	formatErrorResponse,
	formatSuccessResponse,
} from '../utils/response.js';

export const readFieldsTool = defineTool('read-fields', {
	description:
		'Retrieve the field definitions for all collections or a specific collection. Note: This is lots of data and should be used sparingly. Use only if you cannot find the field information you need and you absolutely need to have the raw field definition.',
	inputSchema: z.object({
		collection: z
			.string()
			.optional()
			.describe(
				'Optional: The name (ID) of the collection to retrieve fields for. If omitted, fields for all collections are returned.',
			),
	}),
	handler: async (directus, { collection }) => {
		try {
			const fields = collection
				? await directus.request(readFieldsByCollection(collection))
				: await directus.request(readFields());
			return formatSuccessResponse(fields);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const readFieldTool = defineTool('read-field', {
	description:
		'Retrieve the definition of a specific field within a collection.',
	inputSchema: z.object({
		collection: z
			.string()
			.describe('The name (ID) of the collection the field belongs to.'),
		field: z.string().describe('The name (ID) of the field to retrieve.'),
	}),
	handler: async (directus, { collection, field }) => {
		try {
			const fieldData = await directus.request(readField(collection, field));
			return formatSuccessResponse(fieldData);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const createFieldTool = defineTool('create-field', {
	description: 'Create a new field in a specified collection.',

	inputSchema: z.object({
		collection: z
			.string()
			.describe('The name (ID) of the collection to add the field to.'),
		data: CreateFieldDataSchema.describe(
			'The data for the new field (field name, type, optional schema/meta).',
		),
	}),
	handler: async (directus, { collection, data }) => {
		try {
			const result = await directus.request(createField(collection, data));
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const updateFieldTool = defineTool('update-field', {
	description: 'Update an existing field in a specified collection.',
	inputSchema: z.object({
		collection: z
			.string()
			.describe('The name (ID) of the collection containing the field.'),
		field: z.string().describe('The name (ID) of the field to update.'),
		data: UpdateFieldDataSchema.describe(
			'The partial data to update the field with (type, schema, meta).',
		),
	}),
	handler: async (directus, { collection, field, data }) => {
		try {
			const result = await directus.request(updateField(collection, field, data));
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});



================================================
FILE: src/tools/files.ts
================================================
import { Buffer } from 'node:buffer';
import {
	importFile,
	readAssetArrayBuffer,
	readFile,
	readFiles,
	readFolders,
	updateFilesBatch,
} from '@directus/sdk';
import { z } from 'zod';
import { FileSchema } from '../types/files.js';

import { itemQuerySchema } from '../types/query.js';
import { defineTool } from '../utils/define.js';
import {
	formatErrorResponse,
	formatResourceResponse,
	formatSuccessResponse,
} from '../utils/response.js';

export const readFilesTool = defineTool('read-files', {
	description:
		"Read file (asset) metadata. Provide a query to list multiple files' metadata. Provide 'id' to get a single file's metadata. Provide 'id' and 'raw: true' to get a single file's raw content (Base64 encoded).",
	annotations: {
		title: 'Read Files',
		readOnlyHint: true,
	},
	inputSchema: z.object({
		query: itemQuerySchema
			.optional()
			.describe(
				'Directus query parameters (filter, sort, fields, limit, deep, etc.) for file metadata.',
			),
		id: z
			.string()
			.optional()
			.describe(
				'The ID of the specific file. Omit to retrieve all files.',
			),
		raw: z
			.boolean()
			.optional()
			.describe(
				"If true, fetch raw file content (requires 'id'). Content will be Base64 encoded and returned in the 'blob' field with the correct MIME type.",
			),
	}),

	handler: async (directus, input) => {
		try {
			// Case 1: Get a single file (with or without raw content)
			if (input.id) {
				// Default to all fields if raw to ensure we get type and filename
				const fieldsForMetadata = input.raw ? ['*'] : input.query?.fields;

				const query = fieldsForMetadata
					? { fields: fieldsForMetadata }
					: undefined;

				const metadata = await directus.request(readFile(input.id, query));

				if (!metadata) {
					return formatErrorResponse(`File with ID ${input.id} not found.`);
				}

				// If raw content requested, get base64 (usually for image analysis or vision tool use)
				if (input.raw) {
					// Check if this is an image and if we have dimensions
					const isImage = metadata['type']?.toString().startsWith('image/');
					const width = Number(metadata['width']) || 0;
					const height = Number(metadata['height']) || 0;

					// If image exceeds 1200px in any dimension, apply resize parameter
					let assetRequest;

					if (isImage && (width > 1200 || height > 1200)) {
						// Calculate which dimension to constrain
						const transforms = width > height
							? [['resize', { width: 800, fit: 'contain' }]]
							: [['resize', { height: 800, fit: 'contain' }]];

						assetRequest = readAssetArrayBuffer(input.id, {
							transforms: transforms as [string, ...any[]][],
						});
					}
					else {
						assetRequest = readAssetArrayBuffer(input.id);
					}

					const fileData = await directus.request<ArrayBuffer>(assetRequest);
					const fileBuffer = Buffer.from(fileData);
					const base64Content = fileBuffer.toString('base64');
					const sizeInBytes = fileBuffer.byteLength;

					// The fallback here is janky and certain to fail if the asset is missing a type and it's not an image. Should we just throw an errror?
					const mimeType = metadata['type'] || 'image/jpeg';

					return formatResourceResponse(
						`directus://files/${input.id}/raw`,
						mimeType as string,
						base64Content,
						true,
						sizeInBytes,
					);
				}

				return formatSuccessResponse(metadata);
			}

			// Case 2: Query all files
			const files = await directus.request(
				input.query ? readFiles(input.query) : readFiles(),
			);
			return formatSuccessResponse(files);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const updateFilesTool = defineTool('update-files', {
	description: 'Update the metadata of existing file(s) in Directus.',
	annotations: {
		title: 'Update Files',
	},
	inputSchema: z.object({
		data: z
			.array(FileSchema)
			.describe(
				'An array of objects containing the id and fields to update (e.g., title, description, tags, folder).',
			),
	}),
	handler: async (directus, input) => {
		try {
			if (Object.keys(input.data).length === 0) {
				return formatErrorResponse(
					"The 'data' object cannot be empty. Provide at least one field to update.",
				);
			}

			const result = await directus.request(updateFilesBatch(input.data));
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const importFileTool = defineTool('import-file', {
	description:
		"Import a file to Directus from a web URL. Optionally include 'data' for file metadata (title, folder, etc.).",
	annotations: {
		title: 'Import File',
	},
	inputSchema: z.object({
		url: z.string().describe('URL of the file to import.'),
		data: FileSchema,
	}),
	handler: async (directus, input) => {
		try {
			const result = await directus.request(
				importFile(input.url, input.data || {}),
			);
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const readFoldersTool = defineTool('read-folders', {
	description: 'Read the metadata of existing folders in Directus.',
	annotations: {
		title: 'Read Folders',
	},
	inputSchema: z.object({
		query: itemQuerySchema.optional(),
	}),
	handler: async (directus, input) => {
		try {
			const result = await directus.request(readFolders(input.query));
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});



================================================
FILE: src/tools/flows.ts
================================================
import { readFlows, triggerFlow } from '@directus/sdk';

import * as z from 'zod';
import { defineTool } from '../utils/define.js';
import {
	formatErrorResponse,
	formatSuccessResponse,
} from '../utils/response.js';

export const readFlowsTool = defineTool('read-flows', {
	description: 'Fetch manually triggerable flows from Directus. Flows allow users to automate tasks inside Directus.',
	annotations: {
		title: 'Read Flows',
		readOnlyHint: true,
	},
	inputSchema: z.object({}),
	handler: async (directus, _query) => {
		try {
			const result = await directus.request(
				readFlows({
					filter: {
						trigger: {
							// @ts-expect-error - _prefixed operators not working
							_eq: 'manual',
						},
					},
				}),
			);

			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const triggerFlowTool = defineTool('trigger-flow', {
	description: `Trigger a flow by ID. Rules:
	  - Always call read-flows first and include the FULL flow definition in your reasoning
	  - Always explicitly check if the flow requires selection (options.requireSelection !== false)
	  - Always verify the collection is in the flow's collections list
	  - Always provide a complete data object with all required fields
	  - NEVER skip providing keys when requireSelection is true or undefined`,
	annotations: {
		title: 'Trigger Flow',
	},

	inputSchema: z.object({
		flowDefinition: z
			.record(z.string(), z.any())
			.describe('The full flow definition from the read-flows call.'),
		flowId: z.string().describe('The ID of the flow to trigger'),
		collection: z
			.string()
			.describe('The collection of the items to trigger the flow on.'),
		keys: z
			.array(z.string())
			.describe(
				'The primary keys of the items to trigger the flow on. If the flow requireSelection field is true, you must provide the keys.',
			),
		data: z
			.record(z.string(), z.any())
			.optional()
			.describe(
				'The data to pass to the flow. Should be an object with keys that match the flow *options.fields.fields* property',
			),
	}),

	handler: async (directus, input) => {
		try {
			const { flowDefinition, flowId, collection, keys, data } = input;

			// Validate flow existence
			if (!flowDefinition) {
				throw new Error('Flow definition must be provided');
			}

			// Validate flow ID matches
			if (flowDefinition.id !== flowId) {
				throw new Error(
					`Flow ID mismatch: provided ${flowId} but definition has ${flowDefinition.id}`,
				);
			}

			// Validate collection is valid for this flow
			if (!flowDefinition.options.collections.includes(collection)) {
				throw new Error(
					`Invalid collection "${collection}". This flow only supports: ${flowDefinition.options.collections.join(', ')}`,
				);
			}

			// Check if selection is required
			const requiresSelection =
				flowDefinition.options.requireSelection !== false;

			if (requiresSelection && (!keys || keys.length === 0)) {
				throw new Error(
					'This flow requires selecting at least one item, but no keys were provided',
				);
			}

			// Validate required fields
			if (flowDefinition.options.fields) {
				const requiredFields = flowDefinition.options.fields
					.filter((field: any) => field.meta?.required)
					.map((field: any) => field.field);

				for (const fieldName of requiredFields) {
					if (!data || !(fieldName in data)) {
						throw new Error(`Missing required field: ${fieldName}`);
					}
				}
			}

			// All validations passed, trigger the flow
			const result = await directus.request(
				triggerFlow('POST', flowId, { ...data, collection, keys }),
			);
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});



================================================
FILE: src/tools/index.ts
================================================
import type { Config } from '../config.js';
import type { ToolDefinition } from '../types/tool.js';
import { readCommentsTool, upsertCommentTool } from './comments.js';
import {
	createFieldTool,
	readFieldsTool,
	readFieldTool,
	updateFieldTool,
} from './fields.js';
import {
	importFileTool,
	readFilesTool,
	readFoldersTool,
	updateFilesTool,
} from './files.js';
import {
	readFlowsTool,
	triggerFlowTool,
} from './flows.js';
import {
	createItemTool,
	deleteItemTool,
	readItemsTool,
	updateItemTool,
} from './items.js';
import { markdownTool } from './markdown.js';
import { createSystemPrompt } from './prompts.js';
import schemaTool from './schema.js';
import { readUsersTool, usersMeTool } from './users.js';

export const getTools = (config: Config) => {
	const toolList: ToolDefinition[] = [
		// Users
		usersMeTool,
		readUsersTool,
		// Schema
		schemaTool,
		// Items
		readItemsTool,
		createItemTool,
		updateItemTool,
		deleteItemTool,
		// Flows
		readFlowsTool,
		triggerFlowTool,
		// Files
		readFoldersTool,
		readFilesTool,
		importFileTool,
		updateFilesTool,
		// Fields
		readFieldsTool,
		readFieldTool,
		createFieldTool,
		updateFieldTool,
		// Comments
		readCommentsTool,
		upsertCommentTool,
		// Markdown
		markdownTool,
	];

	// If system propmt is enabled and exists, add the system prompt tool
	if (config.MCP_SYSTEM_PROMPT_ENABLED === 'true' && config.MCP_SYSTEM_PROMPT) {
		toolList.push(createSystemPrompt(config));
	}

	// Filter the list of available tools based on cof
	const availableTools = toolList.filter(
		(tool) => !config.DISABLE_TOOLS.includes(tool.name),
	);

	return availableTools;
};



================================================
FILE: src/tools/items.ts
================================================
import { createItem, deleteItem, readItems, updateItem } from '@directus/sdk';

import * as z from 'zod';
import { itemQuerySchema } from '../types/query.js';
import { checkCollection } from '../utils/check-collection.js';
import { defineTool } from '../utils/define.js';
import { getPrimaryKeyField } from '../utils/get-primary-key.js';
import { generateCmsLink } from '../utils/links.js';
import {
	formatErrorResponse,
	formatSuccessResponse,
} from '../utils/response.js';

export const readItemsTool = defineTool('read-items', {
	description: `Fetch items from any Directus collection.
		- Use the *fields* param with dot notation to fetch related fields.
		For example – fields: ['title','slug','author.first_name','author.last_name']
		`,
	annotations: {
		title: 'Read Items',
		readOnlyHint: true,
	},
	inputSchema: z.object({
		collection: z.string().describe('The name of the collection to read from'),
		query: itemQuerySchema.describe(
			'Directus query parameters (filter, sort, fields, limit, deep, etc. You can use the read-collections tool to get the schema of the collection first.)',
		),
	}),
	handler: async (directus, query, { schema: contextSchema }) => {
		try {
			const { collection, query: queryParams } = query;
			checkCollection(collection, contextSchema);

			const result = await directus.request(
				readItems(collection as unknown as never, queryParams),
			);
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const createItemTool = defineTool('create-item', {
	description:
		'Create an item in a collection. Will return a link to the created item. You should show the link to the user.',
	annotations: {
		title: 'Create Item',
	},

	inputSchema: z.object({
		collection: z.string().describe('The name of the collection to create in'),
		item: z.record(z.string(), z.unknown()).describe('The item data to create'),
		query: itemQuerySchema
			.pick({ fields: true, meta: true })
			.optional()
			.describe(
				'Optional query parameters for the created item (e.g., fields)',
			),
	}),
	handler: async (directus, input, { schema: contextSchema, baseUrl }) => {
		try {
			const { collection, item, query } = input;
			checkCollection(collection, contextSchema);

			const primaryKeyField = getPrimaryKeyField(collection, contextSchema);

			const result = await directus.request(
				createItem(collection, item, query),
			);

			const id = result[primaryKeyField as any];

			return formatSuccessResponse(
				result,
				`Item created: ${generateCmsLink({ baseUrl: baseUrl as string, type: 'item', collection, id: id ?? '' })}`,
			);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const updateItemTool = defineTool('update-item', {
	description:
		'Update an existing item in a collection. Will return a link to the created item. You should show the link to the user.',
	annotations: {
		title: 'Update Item',
		destructiveHint: true,
	},

	inputSchema: z.object({
		collection: z.string().describe('The name of the collection to update in'),
		id: z
			.union([z.string(), z.number()])
			.describe('The primary key of the item to update'),
		data: z
			.record(z.string(), z.unknown())
			.describe('The partial item data to update'),
		query: itemQuerySchema
			.pick({ fields: true, meta: true })
			.optional()
			.describe(
				'Optional query parameters for the updated item (e.g., fields)',
			),
	}),
	handler: async (directus, input, { schema: contextSchema, baseUrl }) => {
		try {
			const { collection, id, data, query } = input;
			checkCollection(collection, contextSchema);
			const primaryKeyField = getPrimaryKeyField(collection, contextSchema);
			const result = await directus.request(
				updateItem(collection, id, data, query),
			);
			return formatSuccessResponse(
				result,
				`Item updated: ${generateCmsLink({ baseUrl: baseUrl ?? '', type: 'item', collection, id: result[primaryKeyField as any] ?? '' })}`,
			);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const deleteItemTool = defineTool('delete-item', {
	description:
		'Delete a single item from a collection. Please confirm with the user before deleting.',
	annotations: {
		title: 'Delete Item',
		destructiveHint: true,
	},
	inputSchema: z.object({
		collection: z
			.string()
			.describe('The name of the collection to delete from'),
		id: z
			.union([z.string(), z.number()])
			.describe('The primary key of the item to delete'),
	}),
	handler: async (directus, input, { schema: contextSchema }) => {
		try {
			const { collection, id } = input;
			checkCollection(collection, contextSchema);
			const result = await directus.request(deleteItem(collection, id));
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});



================================================
FILE: src/tools/markdown.ts
================================================
import * as DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import * as z from 'zod';
import { defineTool } from '../utils/define.js';
import { formatErrorResponse } from '../utils/response.js';

export function markdownToHtml(markdown: string) {
	return DOMPurify.sanitize(marked.parse(markdown));
}

export function htmlToMarkdown(html: string) {
	return marked.parse(html);
}

export const markdownTool = defineTool('markdown-tool', {
	description:
		'Convert HTML to Markdown or Markdown to HTML.',
	annotations: {
		title: 'Markdown Tool',
		readOnlyHint: true,
	},
	inputSchema: z.object({
		html: z.string().optional().describe('HTML string to convert to Markdown'),
		markdown: z.string().optional().describe('Markdown string to convert to HTML'),
	}).refine((data) => data.html || data.markdown, {
		message: 'Either html or markdown must be provided',
		path: ['html', 'markdown'],
	}),
	// @ts-expect-error - We're not using the directus client here
	handler: async (_directus, query) => {
		try {
			if (query.html) {
				return {
					content: [{ type: 'text', text: htmlToMarkdown(query.html) }],
				};
			}

			if (query.markdown) {
				return {
					content: [{ type: 'text', text: markdownToHtml(query.markdown) }],
				};
			}

			return formatErrorResponse(new Error('No input provided'));
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});



================================================
FILE: src/tools/prompts.ts
================================================
import type { Config } from '../config.js';
import { readItems } from '@directus/sdk';
import * as z from 'zod';
import { itemQuerySchema } from '../types/query.js';
import { defineTool } from '../utils/define.js';
import { formatErrorResponse, formatSuccessResponse } from '../utils/response.js';

export function createSystemPrompt(config: Config) {
	return defineTool('system-prompt', {
		description:
			'IMPORTANT! Call this tool first. It will retrieve important information about your role.',
		inputSchema: z.object({}),
		handler: async (_directus, _args) => {
			return {
				content: [{ type: 'text', text: config.MCP_SYSTEM_PROMPT as string }],
			};
		},
	});
}

export function getPromptsTool(config: Config) {
	return defineTool('get-prompts', {
		description: 'Retrieve the list of prompts available to the user.',
		inputSchema: z.object({
			query: itemQuerySchema.describe(
				'Directus query parameters (filter, sort, fields, limit, deep, etc. You can use the read-collections tool to get the schema of the collection first.)',
			),
		}),
		handler: async (directus, query) => {
			try {
				if (config.DIRECTUS_PROMPTS_COLLECTION_ENABLED === 'false') {
					throw new Error('DIRECTUS_PROMPTS_COLLECTION_ENABLED is false');
				}

				if (!config.DIRECTUS_PROMPTS_COLLECTION) {
					throw new Error('DIRECTUS_PROMPTS_COLLECTION is not set');
				}

				const result = await directus.request(readItems(config.DIRECTUS_PROMPTS_COLLECTION as unknown as never, query));
				return formatSuccessResponse(result);
			}
			catch (error) {
				return formatErrorResponse(error);
			}
		},
	});
}



================================================
FILE: src/tools/schema.ts
================================================
import * as z from 'zod';
import { defineTool } from '../utils/define.js';

export default defineTool('read-collections', {
	description:
		'Retrieve the schema of the connected Directus instance. This is a short hand schema to reduce the tokens used for the LLM. The fields will not match the return type of the fields from the Directus API. If you need the exact fields definitions from the Directus API, use the read-fields tool.',
	inputSchema: z.object({}),
	handler: async (_directus, _args, { schema }) => {
		return { content: [{ type: 'text', text: JSON.stringify(schema) }] };
	},
});



================================================
FILE: src/tools/users.ts
================================================
import { readMe, readUsers } from '@directus/sdk';
import * as z from 'zod';
import { itemQuerySchema } from '../types/query.js';
import { defineTool } from '../utils/define.js';
import { formatErrorResponse, formatSuccessResponse } from '../utils/response.js';

export const usersMeTool = defineTool('users-me', {
	description: 'Retrieve information about the current user',
	inputSchema: z.object({
		fields: z.array(z.string()),
	}),
	handler: async (directus, { fields }) => {
		const me = await directus.request(readMe({ fields }));

		return { content: [{ type: 'text', text: JSON.stringify(me) }] };
	},
});

export const readUsersTool = defineTool('read-users', {
	description: 'Retrieve information about users.',
	inputSchema: z.object({
		query: itemQuerySchema.describe(
			'Directus query parameters (filter, sort, fields, limit, deep, etc. You can use the read-collections tool to get the schema of the collection first.)',
		),
	}),
	handler: async (directus, { query }) => {
		try {
			const users = await directus.request(readUsers(query));
			return formatSuccessResponse(users);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});



================================================
FILE: src/types/common.ts
================================================
import { z } from 'zod';

export const nullableString = () =>
	z.string().nullable().optional();

export const optionalString = () =>
	z.string().optional();

export const nullableNumber = () =>
	z.number().nullable().optional();

export const optionalNumber = () =>
	z.number().optional();

export const optionalBoolean = () =>
	z.boolean().optional();

export const nullableBoolean = () =>
	z.boolean().nullable().optional();

export const nullableRecord = () =>
	z.record(z.string(), z.any()).nullable().optional();

export const optionalStringArray = () =>
	z.array(z.string()).optional();

export const nullableStringArray = () =>
	z.array(z.string()).nullable().optional();

export const stringOrNumber = z.union([z.string(), z.number()]);
export const nullableStringOrNumber = stringOrNumber.nullable().optional();

export const stringNumberOrBoolean = z.union([z.string(), z.number(), z.boolean()]);
export const nullableStringNumberOrBoolean = stringNumberOrBoolean.nullable().optional();

export const fieldsParamSchema = nullableStringArray().describe('Specify fields to return. Supports dot notation and wildcards (*).');
export const sortParamSchema = nullableStringArray().describe('Fields to sort by (prefix with - for descending).');
export const limitParamSchema = nullableNumber().describe('Maximum number of items to return.');
export const offsetParamSchema = nullableNumber().describe('Number of items to skip.');
export const pageParamSchema = nullableNumber().describe('Page number for pagination.');
export const searchParamSchema = nullableString().describe('Global search term for root level text fields.');



================================================
FILE: src/types/fields.ts
================================================
import { z } from 'zod';
import {
	nullableNumber,
	nullableRecord,
	nullableString,
	optionalBoolean,
	optionalNumber,
	optionalString,
} from './common.js';

export const FieldSchemaInfoSchema = z.object({
	name: optionalString().describe('The name of the field (often inferred).'),
	table: optionalString().describe('The collection of the field (often inferred).'),
	data_type: optionalString().describe('Database specific data type for the field.'),
	default_value: z.any().nullable().optional().describe('The default value of the field.'),
	max_length: nullableNumber().describe('The max length of the field.'),
	is_nullable: optionalBoolean().describe('If the field is nullable.'),
	is_primary_key: optionalBoolean().describe('If the field is primary key.'),
	has_auto_increment: optionalBoolean().describe('If the field has auto increment.'),
	foreign_key_table: nullableString().describe('Related table from the foreign key constraint.'),
	foreign_key_column: nullableString().describe('Related column from the foreign key constraint.'),
	comment: nullableString().describe('Comment as saved in the database.'),
}).partial().describe('Database level schema information for a field (subset for creation/update).');

export const FieldMetaSchema = z.object({
	collection: optionalString().describe('Collection name (often inferred).'),
	field: optionalString().describe('Field name (often inferred).'),
	interface: nullableString().describe('What interface is used.'),
	options: nullableRecord().describe('Options for the interface.'),
	display: nullableString().describe('What display is used.'),
	display_options: nullableRecord().describe('Options for the display.'),
	readonly: optionalBoolean().describe('If the field is read-only.'),
	hidden: optionalBoolean().describe('If the field should be hidden.'),
	sort: nullableNumber().describe('Sort order.'),
	width: z.enum(['half', 'half-left', 'half-right', 'full', 'fill']).nullable().optional().describe('Width of the field.'),
	translations: nullableRecord().describe("Translations for the field's name."),
	note: nullableString().describe('A note for the field.'),
	required: optionalBoolean().describe('If the field is required.'),
	group: nullableString().describe('Field group (references another field name).'),
	validation: nullableRecord().describe('Validation rule object.'),
	validation_message: nullableString().describe('Validation error message.'),
	conditions: z.array(z.record(z.string(), z.any())).describe('Conditions to display the field.').nullable().optional(),
}).partial().describe('Directus specific metadata and configuration for a field (subset for creation/update).');

export const CreateFieldDataSchema = z.object({
	field: z.string().describe('Unique name of the field. Required.'),
	type: z.string().describe('Directus specific data type. Required.'),
	schema: FieldSchemaInfoSchema.optional().describe('Optional: Database schema details.'),
	meta: FieldMetaSchema.optional().describe('Optional: Directus metadata and configuration.'),
}).describe('Data payload for creating a new field.');

export const UpdateFieldDataSchema = z.object({
	type: optionalString().describe('Optional: New Directus data type.'),
	schema: FieldSchemaInfoSchema.optional().describe('Optional: Database schema details to update.'),
	meta: FieldMetaSchema.optional().describe('Optional: Directus metadata and configuration to update.'),
}).describe('Data payload for updating an existing field. All properties are optional.');

export const FieldSchema = z.object({
	collection: z.string(),
	field: z.string(),
	type: nullableString().describe('Directus data type of the field.'),
	schema: FieldSchemaInfoSchema.nullable(),
	meta: FieldMetaSchema.extend({
		id: optionalNumber().describe('Internal ID of the meta entry.'),
		interface: nullableString().describe('Interface used in Directus UI.'),
		display: nullableString().describe('Display used in Directus UI.'),
		readonly: optionalBoolean().describe('Whether the field is read-only.'),
		hidden: optionalBoolean().describe('Whether the field is hidden.'),
		sort: nullableNumber().describe('Sort order in the UI.'),
		width: z.enum(['half', 'half-left', 'half-right', 'full', 'fill']).nullable().optional().describe('UI width.'),
	}).nullable().describe('Field metadata from Directus.'),
}).describe('Represents a Directus Field as typically returned by the API.');

export type DirectusField = z.infer<typeof FieldSchema>;
export type DirectusCreateFieldData = z.infer<typeof CreateFieldDataSchema>;
export type DirectusUpdateFieldData = z.infer<typeof UpdateFieldDataSchema>;



================================================
FILE: src/types/files.ts
================================================
import { z } from 'zod';
import { nullableNumber, nullableString } from './common.js';

export const FileSchema = z.object({
	id: z.string().describe('The ID of the file to update.'),
	title: nullableString().describe('The name of the file.'),
	folder: nullableString().describe('The ID of the folder the file is in.'),
	description: nullableString().describe(
		'The description of the file. Often used as the alt text on a website',
	),
	location: nullableString().describe(
		'The location of where the photo was taken.',
	),
	tags: z.array(z.string()).optional().describe('The tags of the file.'),
	focal_point_x: nullableNumber().describe(
		'The x coordinate of the focal point of the file in pixels.',
	),
	focal_point_y: nullableNumber().describe(
		'The y coordinate of the focal point of the file.',
	),
	filename_download: nullableString().describe(
		'The filename of the file when users download it.',
	),
});
export type FileSchemaType = z.infer<typeof FileSchema>;



================================================
FILE: src/types/permissions.ts
================================================
export interface ActionPermission {
	access: 'none' | 'partial' | 'full';
	fields?: string[];
	presets?: Record<string, any>;
}

export interface CollectionPermissions {
	create: ActionPermission;
	read: ActionPermission;
	update: ActionPermission;
	delete: ActionPermission;
	share: ActionPermission;
}

export type UserPermissionsData = Record<string, CollectionPermissions>;



================================================
FILE: src/types/prompt.ts
================================================
import type { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import type { ZodType } from 'zod';
import type { Directus } from '../directus.js';
import type { Schema } from '../types/schema.js';

export interface PromptDefinition<Params = any> {
	name: string;
	description: string;
	inputSchema: ZodType<Params>;
	annotations?: Record<string, any>;
	handler: (
		directus: Directus,
		args: Params,
		ctx: { schema: Schema },
	) => Promise<GetPromptResult>;
}



================================================
FILE: src/types/query.ts
================================================
import { z } from 'zod';

import {
	fieldsParamSchema,
	limitParamSchema,
	nullableBoolean,
	nullableNumber,
	nullableString,
	nullableStringArray,
	nullableStringNumberOrBoolean,
	offsetParamSchema,
	optionalBoolean,
	optionalString,
	optionalStringArray,
	pageParamSchema,
	searchParamSchema,
	sortParamSchema,
	stringOrNumber,
} from './common.js';

export const aggregateSchema = z.object({
	avg: optionalStringArray().describe('Average of fields.'),
	avgDistinct: optionalStringArray().describe('Average of distinct fields.'),
	count: optionalStringArray().describe('Count of fields.'),
	countDistinct: optionalStringArray().describe('Count of distinct fields.'),
	sum: optionalStringArray().describe('Sum of fields.'),
	sumDistinct: optionalStringArray().describe('Sum of distinct fields.'),
	min: optionalStringArray().describe('Minimum value of fields.'),
	max: optionalStringArray().describe('Maximum value of fields.'),
}).describe('Aggregation operations to perform.');

export const fieldFilterOperatorSchema = z.object({
	_eq: nullableStringNumberOrBoolean.describe('Equals'),
	_neq: nullableStringNumberOrBoolean.describe('Not equals'),
	_lt: stringOrNumber.optional().describe('Less than'),
	_lte: stringOrNumber.optional().describe('Less than or equal to'),
	_gt: stringOrNumber.optional().describe('Greater than'),
	_gte: stringOrNumber.optional().describe('Greater than or equal to'),
	_in: z.array(stringOrNumber).optional().describe('In array'),
	_nin: z.array(stringOrNumber).optional().describe('Not in array'),
	_null: optionalBoolean().describe('Is null'),
	_nnull: optionalBoolean().describe('Is not null'),
	_contains: optionalString().describe('Contains substring (case-sensitive)'),
	_ncontains: optionalString().describe('Does not contain substring (case-sensitive)'),
	_icontains: optionalString().describe('Contains substring (case-insensitive)'),
	_starts_with: optionalString().describe('Starts with (case-sensitive)'),
	_nstarts_with: optionalString().describe('Does not start with (case-sensitive)'),
	_istarts_with: optionalString().describe('Starts with (case-insensitive)'),
	_nistarts_with: optionalString().describe('Does not start with (case-insensitive)'),
	_ends_with: optionalString().describe('Ends with (case-sensitive)'),
	_nends_with: optionalString().describe('Does not end with (case-sensitive)'),
	_iends_with: optionalString().describe('Ends with (case-insensitive)'),
	_niends_with: optionalString().describe('Does not end with (case-insensitive)'),
	_between: z.array(stringOrNumber).optional().describe('Between two values'),
	_nbetween: z.array(stringOrNumber).optional().describe('Not between two values'),
	_empty: optionalBoolean().describe('Is empty'),
	_nempty: optionalBoolean().describe('Is not empty'),
	_intersects: optionalString().describe('Geometry intersects (GeoJSON)'),
	_nintersects: optionalString().describe('Geometry does not intersect (GeoJSON)'),
	_intersects_bbox: optionalString().describe('Geometry intersects bounding box (GeoJSON)'),
	_nintersects_bbox: optionalString().describe('Geometry does not intersect bounding box (GeoJSON)'),
}).partial().describe('Operators for field filtering.');

export const fieldValidationOperatorSchema = z.object({
	_submitted: optionalBoolean().describe('Is submitted (relevant for validation)'),
	_regex: optionalString().describe('Matches regex pattern'),
}).partial().describe('Operators for field validation.');

export const fieldFilterSchema = z.record(
	z.string(),
	z.union([fieldFilterOperatorSchema, fieldValidationOperatorSchema]),
).describe('Record of field filters.');

export const filterSchema = z.union([
	z.interface({
		get _or() {
			return z.array(filterSchema).describe('Logical OR condition.');
		},
	}),
	z.interface({
		get _and() {
			return z.array(filterSchema).describe('Logical AND condition.');
		},
	}),
	fieldFilterSchema,
]).describe('Recursive filter structure (including logical AND/OR).');

export const deepQuerySchema = z.object({
	_fields: nullableStringArray().describe('Fields for deep query.'),
	_sort: nullableStringArray().describe('Sort order for deep query.'),
	_filter: filterSchema.optional().nullable().describe('Filter for deep query.'),
	_limit: nullableNumber().describe('Limit for deep query.'),
	_offset: nullableNumber().describe('Offset for deep query.'),
	_page: nullableNumber().describe('Page for deep query.'),
	_search: nullableString().describe('Search term for deep query.'),
	_group: nullableStringArray().describe('Grouping fields for deep query.'),
	_aggregate: aggregateSchema.optional().nullable().describe('Aggregation for deep query.'),
}).describe('Schema for a deep query on a relation.');

export const nestedDeepQuerySchema = z.record(z.string(), deepQuerySchema).optional().nullable().describe('Nested deep query for relational fields.');

export const filterParamSchema = filterSchema.optional().nullable().describe('Filter conditions for the query. Respects all standard Directus filter syntax.');

export const versionParamSchema = nullableString().describe('Content version to retrieve.');

export const versionRawParamSchema = nullableBoolean().describe('Whether to return raw version data.');

export const exportParamSchema = z.union([z.literal('json'), z.literal('csv'), z.literal('xml'), z.literal('yaml')]).optional().nullable().describe('Format to export the data.');

export const groupByParamSchema = nullableStringArray().describe('Fields to group results by.');

export const aggregateParamSchema = aggregateSchema.optional().nullable().describe('Aggregation operations to perform on the main query.');

export const aliasParamSchema = z.record(z.string(), z.string()).optional().nullable().describe('Field aliases for the response.');

export const metaParamSchema = z.union([z.literal('total_count'), z.literal('filter_count')]).optional().nullable().describe('Include collection counts in the response.');

export const itemQuerySchema = z.object({
	fields: fieldsParamSchema,
	sort: sortParamSchema,
	filter: filterParamSchema,
	limit: limitParamSchema,
	offset: offsetParamSchema,
	page: pageParamSchema,
	search: searchParamSchema,
	version: versionParamSchema,
	export: exportParamSchema,
	groupBy: groupByParamSchema,
	aggregate: aggregateParamSchema,
	deep: nestedDeepQuerySchema,
	alias: aliasParamSchema,
	meta: metaParamSchema,
}).describe('Main Directus item query parameters.');

export type FieldFilterOperator = z.infer<typeof fieldFilterOperatorSchema>;
export type FieldValidationOperator = z.infer<typeof fieldValidationOperatorSchema>;
export interface FieldFilter {
	[field: string]: FieldFilterOperator | FieldValidationOperator;
}
export interface LogicalFilterOR {
	_or: z.infer<typeof filterSchema>[];
}
export interface LogicalFilterAND {
	_and: z.infer<typeof filterSchema>[];
}
export type LogicalFilter = LogicalFilterOR | LogicalFilterAND;
export type Filter = LogicalFilter | FieldFilter;

export { fieldsParamSchema, limitParamSchema, offsetParamSchema, pageParamSchema, searchParamSchema, sortParamSchema } from './common.js';



================================================
FILE: src/types/schema.ts
================================================
export type CollectionName = string;
export type FieldName = string;
export type Schema = Record<CollectionName, Record<FieldName, Field>>;

export interface Field {
	type: string | null;
	interface?: string | null | undefined;
	note?: string | null | undefined;
	primary_key?: boolean | null | undefined;
	required?: boolean | null | undefined;
	choices?: Record<string, string>[] | null | undefined;
	// Relationship details
	relation_type?: 'm2o' | 'o2m' | 'm2m' | 'm2a' | 'file' | 'files' | null | undefined;
	relation_collection?: string | string[] | null | undefined; // Collection(s) on the other side
	relation_meta?: Record<string, any> | null | undefined; // Stores the corresponding relation.meta object
}



================================================
FILE: src/types/tool.ts
================================================
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { ZodType } from 'zod';
import type { Directus } from '../directus.js';
import type { Schema } from '../types/schema.js';

export interface ToolDefinition<Params = any> {
	name: string;
	description: string;
	inputSchema: ZodType<Params>;
	annotations?: Record<string, any>;
	handler: (
		directus: Directus,
		args: Params,
		ctx: { schema: Schema; baseUrl?: string },
	) => Promise<CallToolResult>;
}



================================================
FILE: src/utils/check-collection.ts
================================================
import type { Schema } from '../types/schema.js';
import { formatErrorResponse } from './response.js';

/**
 * Check if a collection exists in the context schema.
 * @param collection - The collection to check.
 * @param contextSchema - The context schema.
 * @returns The collection if it exists, otherwise an error.
 */
export function checkCollection(collection: string, contextSchema: Schema) {
	if (collection && !contextSchema[collection]) {
		return formatErrorResponse(
			new Error(
				`Collection "${collection}" not found. Use read-collections tool first.`,
			),
		);
	}

	return contextSchema[collection];
}



================================================
FILE: src/utils/define.ts
================================================
import type { PromptDefinition } from '../types/prompt.js';
import type { ToolDefinition } from '../types/tool.js';

export const defineTool = (
	name: string,
	tool: Omit<ToolDefinition, 'name'>,
) => ({ name, ...tool });

export const definePrompt = (
	name: string,
	prompt: Omit<PromptDefinition, 'name'>,
) => ({ name, ...prompt });



================================================
FILE: src/utils/fetch-current-user-permissions.ts
================================================
import type { Directus } from '../directus.js';

import type { UserPermissionsData } from '../types/permissions.js';
import { readUserPermissions } from '@directus/sdk';

/**
 * Fetches the current user's permissions from the Directus API.
 * @param directus - The Directus instance.
 * @returns The current user's permissions.
 */
export async function fetchCurrentUserPermissions(directus: Directus): Promise<UserPermissionsData> {
	const permissions = await directus.request<UserPermissionsData>(
		readUserPermissions(),
	);

	return permissions;
}



================================================
FILE: src/utils/fetch-schema.ts
================================================
import type { Field as DirectusField, Relation as DirectusRelation } from '@directus/types';
import type { Directus } from '../directus.js';

import type { Field, Schema } from '../types/schema.js';
import { readFields, readRelations } from '@directus/sdk';
import { stripNullUndefined } from './strip-null-undefined.js';

/**
 * Fetches the fields and relations from the Directus API and returns an unofficial short-hand schema to reduce the tokens used for the LLM.
 * @param directus - The Directus instance.
 * @returns The schema.
 */
export async function fetchSchema(directus: Directus): Promise<Schema> {
	const fields = await directus.request(readFields()) as unknown as DirectusField[];
	const relations = await directus.request(readRelations()) as unknown as DirectusRelation[];
	const schema: Schema = {};

	// Create a lookup for relations by collection and field for faster access
	const relationsLookup: Record<string, Record<string, DirectusRelation>> = {};

	for (const relation of relations) {
		if (!relationsLookup[relation.collection]) {
			relationsLookup[relation.collection] = {};
		}

		relationsLookup[relation.collection]![relation.field] = relation;
	}

	for (const field of fields) {
		// Skip system fields/collections, but allow relations targeting directus_files or directus_users
		if (field.meta?.system === true) {
			const fieldRelation = relationsLookup[field.collection]?.[field.field];
			const isFileOrUserRelation = fieldRelation?.related_collection === 'directus_files' || fieldRelation?.related_collection === 'directus_users';

			if (!isFileOrUserRelation) {
				// If it's a system field AND not a file/user relation, skip it
				continue;
			}
		}

		// Also skip directus internal collections themselves, unless it's files or users
		if (field.collection.startsWith('directus_') && field.collection !== 'directus_files' && field.collection !== 'directus_users') {
			continue;
		}

		// Skip UI-only fields
		if (field.type === 'alias' && field.meta?.special?.includes('no-data'))
			continue;

		if (!schema[field.collection]) {
			schema[field.collection] = {};
		}

		const schemaField: Field = {
			type: field.type,
			interface: field.meta?.interface ?? undefined,
			primary_key: field.schema?.is_primary_key === true ? true : undefined,
			required: field.meta?.required === true ? true : undefined,
			note: field.meta?.note ?? undefined,
		};

		// If there are choices from the interface, add them to the schema
		if (Array.isArray(field.meta?.options?.['choices']) && field.meta?.options?.['choices'].length > 0) {
			schemaField.choices = field.meta?.options?.['choices'].map((choice: { text: string; value: string }) => ({
				text: choice.text,
				value: choice.value,
			}));
		}

		// Process relationships using both field meta and relations data
		const fieldRelation = relationsLookup[field.collection]?.[field.field];

		if (field.meta?.special) {
			if (field.meta.special.includes('m2o') || field.meta.special.includes('file')) {
				schemaField.relation_type = field.meta.special.includes('file') ? 'file' : 'm2o';

				if (fieldRelation) {
					schemaField.relation_collection = fieldRelation.related_collection;
					schemaField.relation_meta = fieldRelation.meta;
				}
			}
			else if (field.meta.special.includes('o2m')) {
				schemaField.relation_type = 'o2m';

				if (fieldRelation) {
					schemaField.relation_collection = fieldRelation.related_collection;
					schemaField.relation_meta = fieldRelation.meta;
				}
			}
			else if (field.meta.special.includes('m2m') || field.meta.special.includes('files')) {
				schemaField.relation_type = field.meta.special.includes('files') ? 'files' : 'm2m';

				if (fieldRelation) {
					schemaField.relation_collection = fieldRelation.related_collection;
					schemaField.relation_meta = fieldRelation.meta;
				}
			}
			else if (field.meta.special.includes('m2a')) {
				schemaField.relation_type = 'm2a';

				if (fieldRelation) {
					// For M2A, related_collection is null, but one_allowed_collections has the list
					schemaField.relation_collection = stripNullUndefined(fieldRelation.meta?.one_allowed_collections);
					schemaField.relation_meta = stripNullUndefined(fieldRelation.meta);
				}
			}
		}

		// Add the field to the schema
		schema[field.collection]![field.field] = schemaField;
	}

	return schema;
}



================================================
FILE: src/utils/get-primary-key.ts
================================================
/**
 * Gets the primary key field name for a specified collection
 * @param collection The collection name to get the primary key for
 * @param schema The collections schema object containing field definitions
 * @returns The name of the primary key field or null if not found
 */
export function getPrimaryKeyField(
	collection: string,
	schema: Record<string, Record<string, any>>,
): string | null {
	// Check if collection exists in schema
	if (!schema[collection]) {
		return null;
	}

	// Find the field that has primary_key: true
	for (const [fieldName, fieldConfig] of Object.entries(schema[collection])) {
		if (fieldConfig.primary_key === true) {
			return fieldName;
		}
	}

	return null;
}



================================================
FILE: src/utils/is-directus-error.ts
================================================
export interface DirectusApiError {
	message: string;
	extensions: {
		code: string;
		[key: string]: any;
	};
}

export interface DirectusError {
	errors: DirectusApiError[];
	response: Response;
}

/**
 * A type guard to check if an error is a Directus API error
 */
export function isDirectusError(error: unknown): error is DirectusError {
	return (
		typeof error === 'object'
		&& error !== null
		&& 'errors' in error
		&& Array.isArray(error.errors)
		&& 'message' in error.errors[0]
		&& 'extensions' in error.errors[0]
		&& 'code' in error.errors[0].extensions
	);
}



================================================
FILE: src/utils/links.ts
================================================
/**
 * Types of resources that can be linked to in the CMS
 */
export type CmsResourceType = 'item' | 'collection' | 'file' | 'user' | 'visual';

/**
 * Configuration for generating CMS deep links
 */
interface LinkConfig {
	baseUrl: string;
	type: CmsResourceType;
	collection?: string;
	id?: string;
	file?: string;
	user?: string;
	url?: string;
}

/**
 * Base function to generate CMS deep links based on resource type
 * @param config - Configuration for the link
 * @returns A deep link or undefined if required parameters are missing
 */
export const generateCmsLink = (config: Partial<LinkConfig>): string | undefined => {
	const { baseUrl, type, collection, id, file, user, url } = config;

	if (!baseUrl) {
		return undefined;
	}

	switch (type) {
		case 'item':
			if (!collection || !id) return undefined;
			return `${baseUrl}/admin/content/${collection}/${id}`;

		case 'collection':
			if (!collection) return undefined;
			return `${baseUrl}/admin/content/${collection}`;

		case 'file':
			if (!file) return undefined;
			return `${baseUrl}/admin/content/files/${file}`;

		case 'user':
			if (!user) return undefined;
			return `${baseUrl}/admin/content/users/${user}`;

		case 'visual':
			if (!url) return undefined;

			try {
				// Ensure url is a valid URL and not a relative path
				const urlObj = new URL(url);
				// Set visual-editing=true in query params while keeping other params
				urlObj.searchParams.set('visual-editing', 'true');
				return `${baseUrl}/admin/visual/${urlObj.toString()}`;
			}
			catch {
				// Handle invalid URLs
				return undefined;
			}

		default:
			return undefined;
	}
};



================================================
FILE: src/utils/prompt-helpers.ts
================================================
import type { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

type MessageRole = 'user' | 'assistant';

interface PromptMessage {
	role: MessageRole;
	text: string;
}

/**
 * Extracts mustache variables ({{ variable_name }}) from a string
 * @param text - The text to extract variables from
 * @returns An array of unique variable names
 */
export function extractMustacheVariables(text: string): string[] {
	const regex = /\{\{([^{}]*)\}\}/g;
	const variables = new Set<string>();
	let match;

	while ((match = regex.exec(text)) !== null) {
		if (match[1]) {
			variables.add(match[1].trim());
		}
	}

	return [...variables];
}

/**
 * Process a prompt message by replacing mustache variables with values
 * @param message - The message object with role and text
 * @param args - The arguments map with values for variables
 * @returns The processed message with variables replaced
 */
export function processPromptMessage(
	message: PromptMessage,
	args: Record<string, any>,
): { role: MessageRole; content: { type: 'text'; text: string } } {
	let processedText = message.text;

	// Replace all mustache variables
	for (const [key, value] of Object.entries(args)) {
		const escapedKey = key.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
		const regex = new RegExp(`\\{\\{\\s*${escapedKey}\\s*\\}\\}`, 'g');
		processedText = processedText.replace(regex, String(value));
	}

	return {
		role: message.role,
		content: {
			type: 'text',
			text: processedText,
		},
	};
}

/**
 * Process a system prompt by replacing mustache variables with values
 * @param systemPrompt - The system prompt text
 * @param args - The arguments map with values for variables
 * @returns The processed system prompt with variables replaced
 */
export function processSystemPrompt(
	systemPrompt: string,
	args: Record<string, any>,
): string {
	let processedText = systemPrompt;

	// Replace all mustache variables
	for (const [key, value] of Object.entries(args)) {
		const escapedKey = key.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
		const regex = new RegExp(`\\{\\{\\s*${escapedKey}\\s*\\}\\}`, 'g');
		processedText = processedText.replace(regex, String(value));
	}

	return processedText;
}

/**
 * Creates a GetPromptResult by processing system prompt and all messages
 * @param messages - Array of message objects with role and text
 * @param args - Arguments to apply to the prompt templates
 * @param systemPrompt - Optional system prompt text
 * @returns A formatted GetPromptResult for the MCP server
 */
export function createPromptResult(
	messages: PromptMessage[] | null | undefined,
	args: Record<string, any>,
	systemPrompt?: string,
): GetPromptResult {
	const processedMessages = [];

	// Add system prompt as the first assistant message if it exists
	if (systemPrompt) {
		processedMessages.push({
			role: 'assistant',
			content: {
				type: 'text',
				text: processSystemPrompt(systemPrompt, args),
			},
		});
	}

	// Add and process regular messages if they exist
	if (Array.isArray(messages) && messages.length > 0) {
		processedMessages.push(...messages.map((message) => processPromptMessage(message, args)));
	}

	return {
		messages: processedMessages as GetPromptResult['messages'],
	};
}



================================================
FILE: src/utils/response.ts
================================================
import type { DirectusApiError } from './is-directus-error.js';
import { isDirectusError } from './is-directus-error.js';

/**
 * Format a success response for the MCP server.
 * @param data - The data to format.
 * @param message - The message to send to the user.
 * @returns The formatted success response.
 */
export const formatSuccessResponse = (data: unknown, message?: string) => {
	if (message) {
		const formatted = `<data>\n${JSON.stringify(data, null, 2)}\n</data>\n<message>\n${message}\n</message>`;
		return {
			content: [{ type: 'text' as const, text: `${formatted}` }],
		};
	}

	return {
		content: [
			{ type: 'text' as const, text: `${JSON.stringify(data, null, 2)}` },
		],
	};
};

/**
 * Format an error response for the MCP server.
 * @param error - The error to format.
 */
export const formatErrorResponse = (error: unknown) => {
	let errorPayload: Record<string, unknown>;

	if (isDirectusError(error)) {
		// Handle Directus API errors
		errorPayload = {
			directusApiErrors: error.errors.map((e: DirectusApiError) => ({
				message: e.message || 'Unknown error',
				code: e.extensions?.code,
			})),
		};
	}
	else {
		// Handle generic errors
		let message = 'An unknown error occurred.';
		let code: string | undefined;

		if (error instanceof Error) {
			message = error.message;
			code = 'code' in error ? String(error.code) : undefined;
		}
		else if (typeof error === 'object' && error !== null) {
			message = 'message' in error ? String(error.message) : message;
			code = 'code' in error ? String(error.code) : undefined;
		}
		else if (typeof error === 'string') {
			message = error;
		}

		errorPayload = { error: message, ...(code && { code }) };
	}

	return {
		isError: true,
		content: [{ type: 'text' as const, text: JSON.stringify(errorPayload) }],
	};
};

/**
 * Format a response containing a single embedded resource for the MCP server,
 * handling both text and binary content according to the MCP specification.
 *
 * @param uri - The full URI for the resource (e.g., "resource://my-data/123", "file:///path/to/file.txt").
 * @param mimeType - The MIME type of the resource content (e.g., "application/json", "text/plain", "image/png").
 * @param contentString - The resource content. For text resources, this is the plain text. For binary resources, this MUST be the Base64 encoded string.
 * @param isBinary - Set to true if the contentString is Base64 encoded binary data, false or undefined for text.
 * @param size - Optional size of the original resource in bytes.
 * @returns The formatted response object suitable for returning from an MCP tool or resource handler.
 */
export const formatResourceResponse = (
	uri: string,
	mimeType: string,
	contentString: string,
	isBinary?: boolean,
	size?: number,
) => {
	const resourceBase = {
		uri,
		mimeType,
		...(size !== undefined && { size }), // Conditionally add size if provided
	};

	const resource = isBinary
		? {
				...resourceBase,
				blob: contentString, // Use 'blob' field for base64 binary data
			}
		: {
				...resourceBase,
				text: contentString, // Use 'text' field for textual data
			};

	return {
		content: [
			{
				type: 'resource' as const,
				resource,
			},
		],
	};
};



================================================
FILE: src/utils/strip-null-undefined.ts
================================================
/**
 * Recursively removes properties with null or undefined values from an object or array.
 * @param obj The input object or array.
 * @returns A new object or array with null/undefined properties/elements removed, or the original value if not an object/array.
 */
export function stripNullUndefined<T>(obj: T): T | undefined {
	if (obj === null || obj === undefined) {
		return undefined;
	}

	// Handle arrays
	if (Array.isArray(obj)) {
		const newArr = obj.reduce<any[]>((acc, item) => {
			const processed = stripNullUndefined(item);

			if (processed !== undefined) {
				acc.push(processed);
			}

			return acc;
		}, []);

		return newArr.length > 0 ? newArr as T : undefined;
	}

	// Handle objects (excluding Date and other special objects)
	if (typeof obj === 'object' && !(obj instanceof Date)
		&& !(obj instanceof RegExp) && !(obj instanceof Map)
		&& !(obj instanceof Set) && !(obj instanceof Error)) {
		const newObj: Record<string, any> = {};
		let hasKeys = false;

		for (const key of Object.keys(obj)) {
			const value = stripNullUndefined(obj[key as keyof T]);

			if (value !== undefined) {
				newObj[key] = value;
				hasKeys = true;
			}
		}

		return hasKeys ? newObj as T : undefined;
	}

	return obj;
}



================================================
FILE: src/utils/to-mpc-tools.ts
================================================
import type { ToolDefinition } from '../types/tool.js';
import { z } from 'zod';

export const toMpcTools = (defs: ToolDefinition<any>[]) => {
	return defs.map((def) => ({
		name: def.name,
		description: def.description,
		inputSchema: z.toJSONSchema(def.inputSchema, { reused: 'ref' }),
		annotations: def.annotations,
	}));
};


