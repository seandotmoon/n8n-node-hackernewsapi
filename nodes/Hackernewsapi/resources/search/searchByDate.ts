import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSearchByDate = {
	operation: ['searchByDate'],
	resource: ['search'],
};

/**
 * Search by date operation description.
 * 
 * Searches Hacker News content sorted by date, more recent first.
 * Supports filtering by tags, numeric filters, and pagination.
 */
export const searchSearchByDateDescription: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		displayOptions: {
			show: showOnlyForSearchByDate,
		},
		default: '',
		description: 'Full-text search query',
		routing: {
			send: {
				type: 'query',
				property: 'query',
			},
		},
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		displayOptions: {
			show: showOnlyForSearchByDate,
		},
		default: '',
		description:
			'Filter by tags. Available tags: story, comment, poll, pollopt, show_hn, ask_hn, front_page, author_:USERNAME, story_:ID. Tags are ANDed by default, can be ORed if between parenthesis. Example: "story,author_pg" or "(story,poll)"',
		routing: {
			send: {
				type: 'query',
				property: 'tags',
			},
		},
	},
	{
		displayName: 'Numeric Filters',
		name: 'numericFilters',
		type: 'string',
		displayOptions: {
			show: showOnlyForSearchByDate,
		},
		default: '',
		description: 'Filter on numerical conditions (&lt;, &lt;=, =, &gt;, &gt;=). Available fields: created_at_i, points, num_comments. Example: "created_at_i&gt;1609459200,points&gt;100"',
		routing: {
			send: {
				type: 'query',
				property: 'numericFilters',
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSearchByDate,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		description: 'Page number (0-indexed). Only used when "Return All" is disabled.',
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
	},
	{
		displayName: 'Hits Per Page',
		name: 'hitsPerPage',
		type: 'number',
		displayOptions: {
			show: showOnlyForSearchByDate,
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 20,
		description: 'Number of results per page',
		routing: {
			send: {
				type: 'query',
				property: 'hitsPerPage',
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForSearchByDate,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
			},
			operations: {
				pagination: {
					type: 'offset',
					properties: {
						limitParameter: 'hitsPerPage',
						offsetParameter: 'page',
						pageSize: 20,
						type: 'query',
					},
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSearchByDate,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		routing: {
			output: {
				maxResults: '={{$value}}',
			},
		},
		description: 'Max number of results to return',
	},
];
