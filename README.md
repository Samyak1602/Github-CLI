# GitHub Activity CLI

A simple Node.js command-line tool to fetch and display recent public activity for a specified GitHub user.

## Features
- Fetches recent public events (pushes, issues, pull requests, stars, forks, etc.) for any GitHub username.
- Summarizes activity in a readable format.
- Handles common errors (user not found, API rate limits, etc.).

## Usage

1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)

2. **Clone or download this repository.**

3. **Run the script:**
   ```sh
   node github-activity.js <github-username>
   ```
   Replace `<github-username>` with the GitHub username you want to check.

   **Example:**
   ```sh
   node github-activity.js octocat
   ```

## Output Example
```
Recent GitHub activity for octocat:

- Pushed 2 commit(s) to Hello-World
- Starred Spoon-Knife
- Opened a pull request in Hello-World
```

## Notes
- Only public events are shown (private activity is not available via the GitHub public API).
- If you see an API rate limit error, try again later or authenticate your requests (not implemented in this script).

## License
MIT
https://roadmap.sh/projects/github-user-activity


