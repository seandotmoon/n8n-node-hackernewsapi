# n8n-nodes-hackernewsapi

This is an n8n community node that lets you query the **Hacker News Search API (Algolia)** inside your n8n workflows.

The [HN Search API](https://hn.algolia.com/api) provides read-only access to Hacker News data, including stories, comments, and polls with powerful full‑text search and filtering.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)  
[License](#license)

## Installation

Follow the official [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Operations

This node is read‑only and uses the public HN Search API (no credentials required).

### Resource: Search

- **Search**
  - Endpoint: `GET /api/v1/search`
  - Description: Full‑text search on Hacker News, sorted by relevance, then points, then number of comments.
  - Key parameters:
    - `Query`: Full‑text search string.
    - `Tags`: Filter by tags such as `story`, `comment`, `poll`, `pollopt`, `show_hn`, `ask_hn`, `front_page`, `author_:USERNAME`, `story_:ID`.
    - `Numeric Filters`: Conditions on `created_at_i`, `points`, `num_comments` (for example `points>100,num_comments>10`).
    - `Page`, `Hits Per Page`, `Return All`, `Limit`: Control pagination.

- **Search by Date**
  - Endpoint: `GET /api/v1/search_by_date`
  - Description: Same as **Search**, but results are sorted by date (most recent first).
  - Key parameters:
    - Same as **Search**, typically combined with `numericFilters` on `created_at_i` for time‑range queries.

### Resource: Item

- **Get**
  - Endpoint: `GET /api/v1/items/:id`
  - Description: Retrieve a single item (story, comment, poll, or poll option) by numeric ID, including its nested children.
  - Key parameters:
    - `Item ID`: Numeric Hacker News item ID.

## Compatibility

- **n8n version**: Built and tested with recent n8n 1.x/2.x versions.  
- **Node style**: Declarative HTTP node using the n8n Nodes API v1.  
- **Authentication**: Not required. The HN Search API is public and this node does not expose any credential options.

If you encounter a version‑specific issue, please open an issue in this repository with your n8n version and error details.

## Usage

### Add the node

1. Install the package and restart n8n.
2. In the editor, add the **Hacker News API** node to your workflow.

### Example: Search for popular stories

1. Set **Resource** to `Search` and **Operation** to `Search`.
2. Set **Query** to a topic, for example `n8n` or `TypeScript`.
3. Optionally set:
   - **Tags** to `story` to only return stories.
   - **Numeric Filters** to something like `points>100` to only keep higher‑scoring posts.
4. Run the node to get a list of matching stories in the node output.

### Example: Fetch a story and its comments

1. Add a **Hacker News** node with **Resource** = `Item` and **Operation** = `Get`.
2. Set **Item ID** to the numeric ID of the story (for example from a previous Search node).
3. Run the node to receive the story plus its nested `children` (comments) tree.


## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)  
- [HN Search API documentation](https://hn.algolia.com/api)
- [Build a node | n8n Docs](https://docs.n8n.io/integrations/creating-nodes/build/)

## Version history

- **0.1.0**
  - Initial release.
  - Supports:
    - Search (`/api/v1/search`)
    - Search by date (`/api/v1/search_by_date`)
    - Get item (`/api/v1/items/:id`)

## License

This project is licensed under the MIT License.  
See the `LICENSE` file for details.
