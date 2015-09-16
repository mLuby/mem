module.exports = {
  help: 'Set a task due datetime.',
  example: 'mem due 9/14 4:30; mem due Thursday',
  command: due
}

var moment = require('moment')

function due (tasks, dueString) {
  var time = parseTime(dueString)
  if (time.isValid()) {
    for (var id in tasks) {
      tasks[id].due = time.format()
    }
  } else {
    console.log('invalid datetime', dueString, time)
  }

  return tasks
}

function parseTime(due) {
  var weekOffset = due.match(/next/i) ? 7 : 0 + due.match(/last/i) ? -7 : 0
  var relativeTime = due.match(/([0-9]+)([yQMwdhms])/)
  if(relativeTime){
    var parsed = due.replace(/[0-9]+[yQMwdhms]/, moment().add(Number(relativeTime[1]),relativeTime[2]).format('YYYY-MM-DD HH:mm'))
  } else {
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
  }
  return moment(parsed, ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD hh:mm a', 'YYYY-MM-DD hh a', 'HH:mm', 'hh:mm a', 'YYYY-MM-DD'])
}

// if(process.argv[2]) {
//   console.log(parseTime(process.argv[2]))
// } else {
//   console.log(parseTime('2d').format() === '2015-09-13T14:00:00-07:00' ? '√ ' : 'X ', '2pm ->', parseTime('2pm').format())
//   console.log(parseTime('1h').format() === '2015-09-13T14:00:00-07:00' ? '√ ' : 'X ', '2pm ->', parseTime('2pm').format())
//   console.log(parseTime('15m').format() === '2015-09-13T14:00:00-07:00' ? '√ ' : 'X ', '2pm ->', parseTime('2pm').format())
//   // console.log(parseTime('2pm').format() === '2015-09-13T14:00:00-07:00' ? '√ ' : 'X ', '2pm ->', parseTime('2pm').format())
//   // console.log(parseTime('3:42 am').format() === '2015-09-13T03:42:00-07:00' ? '√ ' : 'X ', '3:42 am ->', parseTime('3:42 am').format())
//   // console.log(parseTime('1623').format() === '2015-09-13T16:23:00-07:00' ? '√ ' : 'X ', '1623 ->', parseTime('1623').format())
//   // console.log(parseTime('today').format() === '2015-09-13T00:00:00-07:00' ? '√ ' : 'X ', 'today ->', parseTime('today').format())
//   // console.log(parseTime('tomorrow').format() === '2015-09-14T00:00:00-07:00' ? '√ ' : 'X ', 'tomorrow ->', parseTime('tomorrow').format())
//   // console.log(parseTime('today 13:15').format() === '2015-09-13T13:15:00-07:00' ? '√ ' : 'X ', 'today 13:15 ->', parseTime('today 13:15').format())
//   // console.log(parseTime('today 4pm').format() === '2015-09-13T16:00:00-07:00' ? '√ ' : 'X ', 'today 4pm ->', parseTime('today 4pm').format())
//   // console.log(parseTime('today 5:57am').format() === '2015-09-13T05:57:00-07:00' ? '√ ' : 'X ', 'today 5:57am ->', parseTime('today 5:57am').format())
//   // console.log(parseTime('today eod').format() === '2015-09-13T17:00:00-07:00' ? '√ ' : 'X ', 'today eod ->', parseTime('today eod').format())
//   // console.log(parseTime('today EOD').format() === '2015-09-13T17:00:00-07:00' ? '√ ' : 'X ', 'today EOD ->', parseTime('today EOD').format())
//   // console.log(parseTime('today end of day').format() === '2015-09-13T17:00:00-07:00' ? '√ ' : 'X ', 'today end ->', parseTime('today end of day').format())
//   // console.log(parseTime('today noon').format() === '2015-09-13T12:00:00-07:00' ? '√ ' : 'X ', 'today noon ->', parseTime('today noon').format())
//   // console.log(parseTime('today lunch').format() === '2015-09-13T12:00:00-07:00' ? '√ ' : 'X ', 'today lunch ->', parseTime('today lunch').format())
//   // console.log(parseTime('tomorrow EOD').format() === '2015-09-14T17:00:00-07:00' ? '√ ' : 'X ', 'tomorrow EOD ->', parseTime('tomorrow EOD').format())
//   // console.log(parseTime('thursday EOD').format() === '2015-09-17T17:00:00-07:00' ? '√ ' : 'X ', 'thursday EOD ->', parseTime('thursday EOD').format())
//   // console.log(parseTime('next Tuesday 9am').format() === '2015-09-22T09:00:00-07:00' ? '√ ' : 'X ', 'next Tuesday 9am ->', parseTime('next Tuesday 9am').format())
//   // console.log(parseTime('last wednesday 3:17pm').format() === '2015-09-09T15:17:00-07:00' ? '√ ' : 'X ', 'last wednesday 3:17pm ->', parseTime('last wednesday 3:17pm').format())
// }

// // var script = document.createElement('script'); script.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js'); document.querySelector('body').appendChild(script)
