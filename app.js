const express = require('express');
const app = express();
// const port = process.env.PORT || 3000;

app.get('/info', (req, res) => {
  const slackName = req.query.slack_name;
  const track = req.query.track;

  // Get current day of the week
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Get current UTC time
  const currentUtcTime = new Date().toISOString();

  // Validate UTC time within +/-2 hours
  const currentTime = new Date();
  const twoHoursAgo = new Date(currentTime);
  twoHoursAgo.setHours(currentTime.getHours() - 2);
  const twoHoursLater = new Date(currentTime);
  twoHoursLater.setHours(currentTime.getHours() + 2);

  const isWithinTwoHours = currentTime >= twoHoursAgo && currentTime <= twoHoursLater;

  // GitHub URLs
  const githubUrlFile = 'https://github.com/yourusername/yourrepository/blob/main/yourfile.js';
  const githubUrlSource = 'https://github.com/yourusername/yourrepository';

  // Response JSON
  const response = {
    slack_name: "Da_Code",
    current_day: currentDay,
    current_utc_time: currentUtcTime,
    track: "backend",
    github_url_file: githubUrlFile,
    github_url_source: githubUrlSource,
    status_code: '200'
  };

  // Add time validation status
  if (isWithinTwoHours) {
    response.time_validation = 'Within +/-2 hours';
  } else {
    response.time_validation = 'Outside +/-2 hours';
  }

  res.json(response);
});

app.listen("3000", function() {
 console.log("Server started on port 3000");
});