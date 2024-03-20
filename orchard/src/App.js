// dependencies
import React, { Component } from 'react';

// components
import LatestItems from './components/LatestItems';
import HeroBanner from './components/HeroBanner';

// includes


class App extends Component {
  render () {
  return (
      <div className="App">
        <main>
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