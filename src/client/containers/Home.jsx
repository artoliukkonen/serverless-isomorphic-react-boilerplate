import React from 'react';

const Home = () => (
  <div>
    <h1>Welcome to ServerlessWeb.site</h1>

    <p>
      This site is server-side rendered on AWS Lambda using a boilerplate I built.
      As a demo, it loads data from external API storing it to Redux state and bootstraps client side application.
    </p>

    <h2>Why server-side rendering</h2>
    <p>
      Server-side rendering app means faster initial load time as well as better search engine optimization.
    </p>

    <h2>Why no service X or framework Y?</h2>
    <p>
      There's many services (e.g. Netlify) and frameworks (e.g. next.js) that provide server-side rendering, however at the time of writing there was no
      generic boilerplates to run SSR apps on AWS Lambda. With this boilerplate you can have more control over your app,
      use the tools you like and stay 100% serverless without compromises.
    </p>

    <h2>Who built this? Where I can read more?</h2>
    <p>
      Build by me, <a href="https://twitter.com/artoliukkonen" rel="noopener noreferrer" target="_blank">Arto Liukkonen</a>
      (<a href="https://github.com/artoliukkonen/" rel="noopener noreferrer" target="_blank">see also my Github</a>).
      Open-source version coming soon.
    </p>
  </div>
);

export default Home;
