import { projects, users } from './data.js';

export function createState() {
  return {
    currentUser: users[0],
    viewedUser: users[1],
    friends: [],
    searchQuery: '',
  };
}

export function addFriend(state, user) {
  if (state.friends.some((friend) => friend.id === user.id)) {
    return state;
  }
  state.friends.push(user);
  return state;
}

export function filterUsers(query) {
  const lowered = query.toLowerCase();
  return users.filter((user) => user.name.toLowerCase().includes(lowered));
}

export function filterProjects(query) {
  const lowered = query.toLowerCase();
  return projects.filter((project) => project.title.toLowerCase().includes(lowered));
}
