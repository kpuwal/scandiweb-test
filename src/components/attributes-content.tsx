import React from 'react';
import { AttributesType, PriceType } from '../types';
import { SwatchRow } from './';

type PropsTypes = {
  attributes: AttributesType[],
  prices: PriceType[],
  selectedAttributes: any,
  handleSelect: Function,
  productIndex?: number
}

export default class AttributesContent extends React.Component<PropsTypes> {
  render() {
    const {
      attributes,
      selectedAttributes,
      handleSelect,
      productIndex
    } = this.props;
    return (
      <div>
        {attributes.map((attribute: AttributesType, idx: number) => {
          return (
            <div key={idx}>
              <h3 style={{fontFamily: 'Roboto'}}>
                {(attribute.name).toUpperCase()}
              </h3>
              <SwatchRow
                items={attribute.items}
                name={attribute.name}
                type={attribute.type} 
                {...{selectedAttributes, handleSelect, productIndex}}
              />
           </div>)})
        }
      </div>
    )
  }
}
