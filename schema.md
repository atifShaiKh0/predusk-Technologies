# Database Schema (MongoDB)

The application uses MongoDB to store the candidate profile.

## Profile Collection

| Field       | Type          | Description                                |
| :---------- | :------------ | :----------------------------------------- |
| `name`      | String        | Candidate's full name                      |
| `email`     | String        | Contact email                              |
| `education` | Array<String> | List of educational qualifications         |
| `skills`    | Array<String> | List of technical skills                   |
| `projects`  | Array<Object> | List of projects (see Project Object)      |
| `work`      | Array<Object> | List of work experiences (see Work Object) |
| `links`     | Object        | Social and portfolio links                 |

### Project Object

- `title` (String): Project name
- `description` (String): Brief summary
- `links` (Array<String>): External URLs

### Work Object

- `company` (String)
- `position` (String)
- `duration` (String)
- `description` (String)

### Links Object

- `github` (String)
- `linkedin` (String)
- `portfolio` (String)

## Indexes

- Text index on `projects.title` and `projects.description` (Planned/Recommended for large datasets).
- Currently using basic array filtering for the search endpoint.
