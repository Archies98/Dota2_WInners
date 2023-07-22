// reference: https://www.npmjs.com/package/node-schedule
const schedule = require("node-schedule");

// create a new rule that will run at the designated time
const rule = new schedule.RecurrenceRule();

// designated time to execute job is 7 AM everyday
// rule.hour = 7;
// rule.minute = 0;
rule.second = 0;
// Timezone is EST.
rule.tz = 'Canada/Eastern';

const job = schedule.scheduleJob(rule, function(){
  require('./main.js');
  require('./parse.js');
  require('./mailer.js');
});