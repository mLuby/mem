task:
  id: (integer auto)
  owner_ids: [user.ids]
  follower_ids: [user.ids] # v2
  name: (text)
  description: (text)
  prerequisite_ids: [task ids]
  subtasks: [task ids]

user:
  id: (integer auto)
  name: (text)
  password: (encrypt etc)
