Memory
======

Side project on tasks, bookmarks, etc.

#currently breaking this project up into three phases: node, angular, and ionic.

User Stories:
- [ ] I can create tasks that can be marked complete.
- [ ] I can designate task prerequisites, including other tasks, available calendar time, items, etc.
- [ ] Tasks won't appear until their prerequisites are met. / I can chain tasks so that completing one task brings up the next one in the chain.
- [ ] I can save a link, comment, or photo for later, even though it isn't a task. (loose association, bookmarks)
- [ ] I want to forward an email and have it turn into a task.

User research:
- "Takes longer to make a task than to actually do the task. Only useful for recurring tasks."
- "If I don't make a task right when I learn about some deadline, I'd end up creating the task and completing it at the deadline instead of working on the deadline itself."
- "Need motivation to do some tasks."
- "Don't want emails telling me what to do."
- "I don't get through all my tasks, so they build up and prevent me from working on important things."

Services to consider:
- asana
- bookmarks
- calendar
- reminders
- evernote

Ionic development commands:
- Develop in the browser with live reload: `$ ionic serve`
- Build your app: `$ ionic build <PLATFORM>`
- Simulate your app: `$ ionic emulate <PLATFORM>`
- Run your app on a device: `$ ionic run <PLATFORM>`

Business Mode:
- allow easy delegation of a task to TaskRabbit
