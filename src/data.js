export const users = [
  {
    id: 'u1',
    name: 'Aisha Khan',
    avatar: 'https://i.pravatar.cc/100?img=48',
    bio: 'Frontend developer looking for open-source collaborators.',
    skills: ['React', 'TypeScript', 'UI/UX'],
  },
  {
    id: 'u2',
    name: 'Marco Lee',
    avatar: 'https://i.pravatar.cc/100?img=12',
    bio: 'Backend engineer building API-first products.',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
  },
];

export const projects = [
  {
    id: 'p1',
    title: 'Open Source Habit Tracker',
    owner: 'Aisha Khan',
    description: 'Need help adding analytics dashboard and unit tests.',
    tags: ['React', 'Charts', 'Testing'],
  },
  {
    id: 'p2',
    title: 'Realtime Pair Programming Rooms',
    owner: 'Marco Lee',
    description: 'Looking for WebSocket + scaling guidance.',
    tags: ['Node.js', 'WebSockets', 'Redis'],
  },
];

export const inboxThreads = [
  {
    id: 'm1',
    from: 'Aisha Khan',
    subject: 'Collab on habit tracker',
    preview: 'Would you like to own the charting module?',
    unread: true,
  },
  {
    id: 'm2',
    from: 'Marco Lee',
    subject: 'API review',
    preview: 'Can you check the auth middleware by Friday?',
    unread: false,
  },
];
