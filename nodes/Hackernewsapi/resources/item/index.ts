import type { INodeProperties } from 'n8n-workflow';
import { itemGetDescription } from './get';

const showOnlyForItems = {
	resource: ['item'],
};

/**
 * Item resource description for Hacker News API.
 * 
 * Items represent stories, comments, polls, and poll options on Hacker News.
 */
export const itemDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForItems,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get an item',
				description: 'Get a specific item (story, comment, poll, etc.) by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/items/{{$parameter.itemId}}',
					},
				},
			},
		],
		default: 'get',
	},
	...itemGetDescription,
];
