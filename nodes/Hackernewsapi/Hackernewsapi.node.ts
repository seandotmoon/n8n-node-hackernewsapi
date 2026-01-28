import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { itemDescription } from './resources/item';
import { searchDescription } from './resources/search';

/**
 * Hacker News API node for n8n.
 * 
 * This node interacts with the Hacker News API powered by Algolia.
 * It provides access to items and search functionality.
 */
export class Hackernewsapi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hacker News API',
		name: 'hackernewsapi',
		icon: { light: 'file:hackernewsapi.svg', dark: 'file:hackernewsapi.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Hacker News API (Algolia)',
		defaults: {
			name: 'Hacker News API',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		requestDefaults: {
			baseURL: 'https://hn.algolia.com/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Item',
						value: 'item',
					},
					{
						name: 'Search',
						value: 'search',
					},
				],
				default: 'search',
			},
			...itemDescription,
			...searchDescription,
		],
	};
}
