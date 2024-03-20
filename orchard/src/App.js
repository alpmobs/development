// dependencies
import React, { Component } from 'react';

// components
import LatestItems from './Components/LatestItems';
import HeroBanner from './Components/HeroBanner';

import "../src/Styles/theme.css";

class App extends Component {
  render () {
  return (
      <div className="App">
        <main role="main">
          <section>
            <HeroBanner />
          </section>
          <section>
            <LatestItems />
          </section>
        </main>
      </div>
  );
}
}

export default App;