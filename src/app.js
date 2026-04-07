import { inboxThreads, projects } from './data.js';
import { addFriend, createState, filterProjects, filterUsers } from './state.js';

const app = document.querySelector('#app');
const state = createState();

function section(content) {
  return `<section class="card">${content}</section>`;
}

function renderSearch() {
  const people = filterUsers(state.searchQuery)
    .map((user) => `<li>${user.name}</li>`)
    .join('');

  const projectList = filterProjects(state.searchQuery)
    .map((project) => `<li>${project.title}</li>`)
    .join('');

  app.innerHTML = section(`
    <h2>Search</h2>
    <input id="search-input" class="input" placeholder="Search people or projects" value="${state.searchQuery}"/>
    <div class="search-grid">
      <div><h3>People</h3><ul class="list">${people}</ul></div>
      <div><h3>Projects</h3><ul class="list">${projectList}</ul></div>
    </div>
  `);

  document.querySelector('#search-input')?.addEventListener('input', (event) => {
    state.searchQuery = event.target.value;
    renderSearch();
  });
}

function renderProfile() {
  const isFriend = state.friends.some((friend) => friend.id === state.viewedUser.id);
  app.innerHTML = section(`
    <h2>Profile</h2>
    <img class="avatar" src="${state.viewedUser.avatar}" alt="${state.viewedUser.name} avatar"/>
    <h3>${state.viewedUser.name}</h3>
    <p>${state.viewedUser.bio}</p>
    <p><strong>Skills:</strong> ${state.viewedUser.skills.join(', ')}</p>
    <button id="add-friend-btn" class="btn" ${isFriend ? 'disabled' : ''}>${isFriend ? 'Friend Added' : 'Add Friend'}</button>
  `);

  document.querySelector('#add-friend-btn')?.addEventListener('click', () => {
    addFriend(state, state.viewedUser);
    renderProfile();
  });
}

function renderProjects() {
  app.innerHTML = section(`
    <h2>Projects Needing Collaborators</h2>
    <ul class="list">
      ${projects
        .map(
          (project) => `<li class="list-item">
            <h3>${project.title}</h3>
            <p><strong>Owner:</strong> ${project.owner}</p>
            <p>${project.description}</p>
            <p><strong>Tags:</strong> ${project.tags.join(', ')}</p>
            <button class="btn">Text Project Owner</button>
          </li>`,
        )
        .join('')}
    </ul>
  `);
}

function renderInbox() {
  app.innerHTML = section(`
    <h2>Inbox</h2>
    <ul class="list">
      ${inboxThreads
        .map(
          (thread) => `<li class="list-item">
            <h3>${thread.subject} ${thread.unread ? '<span class="badge">New</span>' : ''}</h3>
            <p><strong>From:</strong> ${thread.from}</p>
            <p>${thread.preview}</p>
          </li>`,
        )
        .join('')}
    </ul>
  `);
}

function renderFriends() {
  app.innerHTML = section(`
    <h2>Friends</h2>
    ${
      state.friends.length === 0
        ? '<p>No friends added yet.</p>'
        : `<ul class="list">${state.friends.map((friend) => `<li>${friend.name}</li>`).join('')}</ul>`
    }
  `);
}

function renderAuth(type) {
  const signupField =
    type === 'signup'
      ? '<label>Username</label><input class="input" type="text" required />'
      : '';

  app.innerHTML = section(`
    <h2>${type === 'login' ? 'Login' : 'Signup'}</h2>
    <form class="form">
      <label>Email</label>
      <input class="input" type="email" required />
      <label>Password</label>
      <input class="input" type="password" required />
      ${signupField}
      <button class="btn" type="submit">${type === 'login' ? 'Sign In' : 'Create Account'}</button>
    </form>
  `);
}

function renderRoute() {
  const route = window.location.hash.replace('#', '') || 'search';
  const map = {
    search: renderSearch,
    profile: renderProfile,
    projects: renderProjects,
    inbox: renderInbox,
    friends: renderFriends,
    login: () => renderAuth('login'),
    signup: () => renderAuth('signup'),
  };

  (map[route] || renderSearch)();
}

window.addEventListener('hashchange', renderRoute);
renderRoute();
