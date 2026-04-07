const pages = [
  'Profile',
  'Projects',
  'Inbox',
  'Search',
  'Signup',
  'Login',
  'Friends'
];

const app = document.querySelector('#app');

if (!app) {
  throw new Error('Expected #app container in index.html');
}

app.innerHTML = `
  <section class="container">
    <h1>CodeTogether</h1>
    <p>Starter scaffold restored so contributors can run and validate frontend behavior.</p>
    <ul class="page-list">
      ${pages.map((page) => `<li>${page}</li>`).join('')}
    </ul>
  </section>
`;
