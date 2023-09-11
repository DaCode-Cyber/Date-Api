const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

app.get('/task', (req, res) => {
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
  const githubUrlFile = 'https://github.com/DaCode-Cyber/Date-Api/blob/main/app.js';
  const githubUrlSource = 'https://github.com/DaCode-Cyber/Date-Api';

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

app.listen(PORT, () => {
 console.log('server started on port ${PORT}');
});
