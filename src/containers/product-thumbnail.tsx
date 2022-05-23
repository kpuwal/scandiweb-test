import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { ProductType } from '../types';
import { addToCart } from '../redux/slices/cart-slice';
import PriceDisplay from '../components/price-display';
import CartIcon from '../assets/cart-w.png';

type PropsTypes = {
  product: ProductType,
  addToCart: Function
}

type StateTypes = {
  display: string,
  inCart: boolean
}

class ProductThumbnail extends React.Component<PropsTypes, StateTypes> {
  constructor(props: PropsTypes) {
    super(props);
    this.state = {
      display: 'none',
      inCart: false
  }}

  showButton() { this.setState({display: 'flex'}) };
  hideButton() { this.setState({display: "none"}) };

  handleAddToCart(product: ProductType) {
    this.props.addToCart({product});
    this.setState({inCart: true})
  }

  render() {
    const product = this.props.product;
    return (
      <ProductItemContainer
        onMouseEnter={() => this.showButton()}
        onMouseLeave={() => this.hideButton()}
      >
        <Link style={{ textDecoration: 'none'}} to={`/${product.id}`}>
          <ImageContainer
            img={product.gallery[0]}
            hasOpacity={product.inStock}
          >
           {!product.inStock &&  <OutOfStock>OUT OF STOCK</OutOfStock>}
          </ImageContainer>
          
          <DescriptionContainer>
            <ProductName>{product.brand} {product.name}</ProductName>
            <PriceDisplay isBold={false} prices={product.prices} />
          </DescriptionContainer>
        </Link>
        {product.inStock &&
            <AddToCartButton 
                display={this.state.display}
                onClick={() => this.handleAddToCart(product)}>
                <CartImage src={CartIcon} alt='cart icon' />
              </AddToCartButton>
            }
      </ProductItemContainer>
    )
  }
}

type StyledProps = {
  img: string,
  hasOpacity: boolean
}

const mapDispatchToProps = { addToCart };
export default connect(null, mapDispatchToProps)(ProductThumbnail);

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 386px;
  height: 450px;
  // padding: 3.6% 4.1%;
  // padding: 16px 16px;
  margin: 0 40px 103px 0;
  overflow: hidden;
  text-decoration: none;
  &:hover {
    box-shadow: 0px 0px 22px -2px rgba(0,0,0,0.1);
  }
  // background-color: lightgray;
`
const ImageContainer = styled.div`
  background-image: ${(props: StyledProps) => `url(${props.img})`};
  opacity: ${(props: StyledProps) => props.hasOpacity ? 1 : 0.5};
  display: flex;
  margin: 16px 16px 21px 16px;
  width: 356px; 
  height: 338px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;

`
const AddToCartButton = styled.div`
  display: ${(props: {display: string}) => props.display};
  height: 52px;
  width: 52px;
  background-color: #5ECE7B;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.15);
  &:active {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  // margin-left: 13rem; // 15% 270px;
  // margin-top: -1.5rem; // 310px;
  margin-left: 299px;
  margin-top: 330px;
`
const OutOfStock = styled.p`
 position: absolute;
 margin-top: 6rem; // 180px;
 margin-left: 3rem; // 85px;
 font-weight: 400;
 font-size: 25px;
 color: black
`
const CartImage = styled.img`
  width: 25px;
  height: 25px;
`
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 356px;
  height: 58px;
  margin: 0 16px;
  font-size: 18px;
  color: #1D1F22;
  // background-color: yellow;
`
const ProductName = styled.span`
  font-weight: 300;
  hight: 29px;
  padding: 5px 0;
  font-size: 18px;
  // background-color: red;
`
