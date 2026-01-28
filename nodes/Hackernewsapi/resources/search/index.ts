import type { INodeProperties } from 'n8n-workflow';
import { searchSearchDescription } from './search';
import { searchSearchByDateDescription } from './searchByDate';

const showOnlyForSearch = {
	resource: ['search'],
};

/**
 * Search resource description for Hacker News API.
 * 
 * Provides search functionality for Hacker News content including stories,
 * comments, polls, and more. Supports filtering by tags, dates, and other criteria.
 */
export const searchDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSearch,
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search Hacker News',
				description: 'Search Hacker News sorted by relevance, then points, then number of comments',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
					},
				},
			},
			{
				name: 'Search by Date',
				value: 'searchByDate',
				action: 'Search Hacker News by date',
				description: 'Search Hacker News sorted by date, more recent first',
				routing: {
					request: {
						method: 'GET',
						url: '/search_by_date',
					},
				},
			},
		],
		default: 'search',
	},
	...searchSearchDescription,
	...searchSearchByDateDescription,
];
