import * as React from 'react';
import './App.css';
import {CatalogEntry, CatalogueResponse} from './CatalogueResponse';
import {ProductListItem} from './ProductListItem';

const logo = require('./logo.svg');

interface AppState {
    catalogData: CatalogEntry[] | undefined;
}

interface AppProps {
}


class App extends React.Component<AppProps, AppState> {


    constructor(props: AppProps) {
        super(props);

        this.state = {
            catalogData: undefined
        };
    }

    componentDidMount(): void {
        let promise = CatalogueResponse.loadCatalogueData();
        promise.then(catalogResponse => {
            this.setCatalogData(catalogResponse.catalogData);
        });
    }

    render() {
        let listItems;
        if (this.state.catalogData) {
            const catalogData = this.state.catalogData;
            listItems = catalogData.map((catalogEntry) => {
                    return <ProductListItem key={catalogEntry.id} catalogEntry={catalogEntry}/>;
                }
            );
        }

        return (
            <ul>
                {listItems}
            </ul>
        );
    }

    private setCatalogData(inCatalogData: CatalogEntry[]) {
        this.setState({
            catalogData: inCatalogData
        });
    }
}

export default App;
