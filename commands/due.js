module.exports = {
  help: 'Set a task due datetime.',
  example: 'mem due 9/14 4:30; mem due Thursday',
  command: due
}

var moment = require('moment')

function due (tasks, dueString) {
  var time = parseRelativeTime(dueString)
  if (time.isValid()) {
    for (var id in tasks) {
      tasks[id].due = time.format()
    }
  } else {
    console.log('invalid datetime', dueString, time.format())
  }

  return tasks
}

function parseRelativeTime(due) {
  var weekOffset = due.match(/next/i) ? 7 : 0 + due.match(/last/i) ? -7 : 0
  var parsed = due
    .replace(/(end of day|eod)/i, '17:00')
    .replace(/(noon|lunch)/i, '12:00')
    .replace(/today/i, moment().format('YYYY-MM-DD'))
    .replace(/tomorrow/i, moment().add(1,'d').format('YYYY-MM-DD'))
    .replace(/sunday/i, moment().weekday(0+weekOffset).format('YYYY-MM-DD'))
    .replace(/monday/i, moment().weekday(1+weekOffset).format('YYYY-MM-DD'))
    .replace(/tuesday/i, moment().weekday(2+weekOffset).format('YYYY-MM-DD'))
    .replace(/wednesday/i, moment().weekday(3+weekOffset).format('YYYY-MM-DD'))
    .replace(/thursday/i, moment().weekday(4+weekOffset).format('YYYY-MM-DD'))
    .replace(/friday/i, moment().weekday(5+weekOffset).format('YYYY-MM-DD'))
    .replace(/saturday/i, moment().weekday(6+weekOffset).format('YYYY-MM-DD'))
    console.log('parsed', parsed)
  return moment(parsed, ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD hh:mm a', 'YYYY-MM-DD hh a', 'HH:mm', 'hh:mm a', 'YYYY-MM-DD'])
}

// if(process.argv[2]) {
//   console.log(parseRelativeTime(process.argv[2]))
// } else {
//   console.log(parseRelativeTime('2pm').format() === '2015-09-13T14:00:00-07:00' ? '√ ' : 'X ', '2pm ->', parseRelativeTime('2pm').format())
//   console.log(parseRelativeTime('3:42 am').format() === '2015-09-13T03:42:00-07:00' ? '√ ' : 'X ', '3:42 am ->', parseRelativeTime('3:42 am').format())
//   console.log(parseRelativeTime('1623').format() === '2015-09-13T16:23:00-07:00' ? '√ ' : 'X ', '1623 ->', parseRelativeTime('1623').format())
//   console.log(parseRelativeTime('today').format() === '2015-09-13T00:00:00-07:00' ? '√ ' : 'X ', 'today ->', parseRelativeTime('today').format())
//   console.log(parseRelativeTime('tomorrow').format() === '2015-09-14T00:00:00-07:00' ? '√ ' : 'X ', 'tomorrow ->', parseRelativeTime('tomorrow').format())
//   console.log(parseRelativeTime('today 13:15').format() === '2015-09-13T13:15:00-07:00' ? '√ ' : 'X ', 'today 13:15 ->', parseRelativeTime('today 13:15').format())
//   console.log(parseRelativeTime('today 4pm').format() === '2015-09-13T16:00:00-07:00' ? '√ ' : 'X ', 'today 4pm ->', parseRelativeTime('today 4pm').format())
//   console.log(parseRelativeTime('today 5:57am').format() === '2015-09-13T05:57:00-07:00' ? '√ ' : 'X ', 'today 5:57am ->', parseRelativeTime('today 5:57am').format())
//   console.log(parseRelativeTime('today eod').format() === '2015-09-13T17:00:00-07:00' ? '√ ' : 'X ', 'today eod ->', parseRelativeTime('today eod').format())
//   console.log(parseRelativeTime('today EOD').format() === '2015-09-13T17:00:00-07:00' ? '√ ' : 'X ', 'today EOD ->', parseRelativeTime('today EOD').format())
//   console.log(parseRelativeTime('today end of day').format() === '2015-09-13T17:00:00-07:00' ? '√ ' : 'X ', 'today end ->', parseRelativeTime('today end of day').format())
//   console.log(parseRelativeTime('today noon').format() === '2015-09-13T12:00:00-07:00' ? '√ ' : 'X ', 'today noon ->', parseRelativeTime('today noon').format())
//   console.log(parseRelativeTime('today lunch').format() === '2015-09-13T12:00:00-07:00' ? '√ ' : 'X ', 'today lunch ->', parseRelativeTime('today lunch').format())
//   console.log(parseRelativeTime('tomorrow EOD').format() === '2015-09-14T17:00:00-07:00' ? '√ ' : 'X ', 'tomorrow EOD ->', parseRelativeTime('tomorrow EOD').format())
//   console.log(parseRelativeTime('thursday EOD').format() === '2015-09-17T17:00:00-07:00' ? '√ ' : 'X ', 'thursday EOD ->', parseRelativeTime('thursday EOD').format())
//   console.log(parseRelativeTime('next Tuesday 9am').format() === '2015-09-22T09:00:00-07:00' ? '√ ' : 'X ', 'next Tuesday 9am ->', parseRelativeTime('next Tuesday 9am').format())
//   console.log(parseRelativeTime('last wednesday 3:17pm').format() === '2015-09-09T15:17:00-07:00' ? '√ ' : 'X ', 'last wednesday 3:17pm ->', parseRelativeTime('last wednesday 3:17pm').format())
// }

// var script = document.createElement('script'); script.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js'); document.querySelector('body').appendChild(script)
