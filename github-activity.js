const https = require('https');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: node github-activity.js <github-username>");
  process.exit(1);
}

const username = args[0];
const options = {
  hostname: 'api.github.com',
  path: `/users/${username}/events`,
  method: 'GET',
  headers: {
    'User-Agent': 'node.js'
  }
};

const req = https.request(options, res => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const events = JSON.parse(data);
        if (events.length === 0) {
          console.log("No recent activity found.");
          return;
        }

        console.log(`\nRecent GitHub activity for ${username}:\n`);
        events.forEach(event => {
          const repoName = event.repo.name;
          const type = event.type;

          switch (type) {
            case 'PushEvent':
              const commitCount = event.payload.commits.length;
              console.log(`- Pushed ${commitCount} commit(s) to ${repoName}`);
              break;
            case 'IssuesEvent':
              console.log(`- ${event.payload.action} an issue in ${repoName}`);
              break;
            case 'IssueCommentEvent':
              console.log(`- Commented on an issue in ${repoName}`);
              break;
            case 'PullRequestEvent':
              console.log(`- ${event.payload.action} a pull request in ${repoName}`);
              break;
            case 'WatchEvent':
              console.log(`- Starred ${repoName}`);
              break;
            case 'CreateEvent':
              console.log(`- Created ${event.payload.ref_type} in ${repoName}`);
              break;
            case 'ForkEvent':
              console.log(`- Forked ${repoName}`);
              break;
            default:
              // Optional: print unhandled event types
              // console.log(`- ${type} in ${repoName}`);
              break;
          }
        });
      } catch (err) {
        console.error("Failed to parse JSON:", err.message);
      }
    } else if (res.statusCode === 404) {
      console.log("User not found.");
    } else if (res.statusCode === 403) {
      console.log("API rate limit exceeded. Try again later.");
    } else {
      console.error(`Error: Received status code ${res.statusCode}`);
    }
  });
});

req.on('error', err => {
  console.error("Request error:", err.message);
});

req.end();
