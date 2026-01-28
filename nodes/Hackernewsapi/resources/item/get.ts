import type { INodeProperties } from 'n8n-workflow';

const showOnlyForItemGet = {
	operation: ['get'],
	resource: ['item'],
};

/**
 * Get item operation description.
 * 
 * Retrieves a specific Hacker News item by its ID.
 * Items can be stories, comments, polls, or poll options.
 */
export const itemGetDescription: INodeProperties[] = [
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'number',
		displayOptions: {
			show: showOnlyForItemGet,
		},
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		required: true,
		description: 'The ID of the item to retrieve',
	},
];
