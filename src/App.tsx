import * as React from 'react';
import './App.css';
import {CatalogData, CatalogueResponse} from './CatalogueResponse';

const logo = require('./logo.svg');

class App extends React.Component<Props, State> {


    componentDidMount(): void {
        let promise = CatalogueResponse.loadCatalogueData();
        promise.then(catalogResponse => {
            this.setCatalogData(catalogResponse.catalogData);
        })
    }

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is a React component</h1>
        </header>
      </div>
    );
  }

    private setCatalogData(inCatalogData: CatalogData) {
        this.setState( {
            catalogData: inCatalogData
        });
    }
}

export default App;
