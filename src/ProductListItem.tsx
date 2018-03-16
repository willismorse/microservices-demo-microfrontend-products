import {CatalogEntry} from './CatalogueResponse';
import * as React from 'react';
import './ProductListItem.css';

interface ProductListItemState {
}

interface ProductListItemProps {
    catalogEntry: CatalogEntry;
}

export class ProductListItem extends React.Component<ProductListItemProps, ProductListItemState> {
 
    constructor(props: ProductListItemProps) {
        super(props);
    } 
   
    render() {

        return (
            <div className="products-item">
                <h1 className="products-item-name">{this.props.catalogEntry.name}</h1>
                <p className="products-item-description">{this.props.catalogEntry.description}</p>
                <p className="products-item-price">${this.props.catalogEntry.price}</p>
                {
                    this.props.catalogEntry.imageUrl.map(value => {
                        return <img className="products-item-image" src={value} />
                    })
                }

            </div>
        );
    }

}

