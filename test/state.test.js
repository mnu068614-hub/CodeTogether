import test from 'node:test';
import assert from 'node:assert/strict';
import { users } from '../src/data.js';
import { addFriend, createState, filterProjects, filterUsers } from '../src/state.js';

test('addFriend adds new friend only once', () => {
  const state = createState();
  addFriend(state, users[1]);
  addFriend(state, users[1]);
  assert.equal(state.friends.length, 1);
  assert.equal(state.friends[0].name, 'Marco Lee');
});

test('filterUsers matches case-insensitive names', () => {
  const results = filterUsers('aisha');
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'u1');
});

test('filterProjects matches case-insensitive titles', () => {
  const results = filterProjects('realtime');
  assert.equal(results.length, 1);
  assert.match(results[0].title, /Realtime/);
});
