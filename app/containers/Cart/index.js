import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputNumber, Row, Col } from 'rsuite';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import _ from 'lodash';
import { addCartItem, removeCartItem } from './actions';
import reducer from './reducer';
import {
  makeSelectOutletInfo,
  makeSelectCartItems,
  makeSelectCurrentOutlet,
} from './selectors';

const CartItems = styled.div`
  overflow: scroll;
  height: 94%;
`;

const StyledMenuDiv = styled.div`
  width: 100%;
  background: #1a1b1c;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

const StyledCartItemDiv = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 6px 12px;
  border-radius: 8px;
  margin-top: 16px;
`;
const StyledText = styled.p`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
  text-align: center;
  margin: 0px;
`;
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;
const ButtonStyles = {
  width: '100%',
  position: 'absolute',
  bottom: '0px',
  left: '0',
  backgroundColor: '#3498ff',
  borderRadius: '8px',
  padding: '5px 10px',
  text: 'center',
};
class Cart extends Component {
  render() {
    const { cartItems, outlet } = this.props;
    // console.log(cartItems, 'CART ITEMS FROM CART COMPONENT PREETHAM VARANASI');

    if (!outlet) {
      return <>Loading...</>;
    }

    const itemToRender = outlet.menu.map((item, index) => {
      const inputRef = React.createRef();

      const handleMinus = () => {
        inputRef.current.handleMinus();
      };
      const handlePlus = () => {
        inputRef.current.handlePlus();
      };
      if (cartItems && item.id in cartItems) {
        return (
          <StyledMenuDiv key={index}>
            <StyledFlexContainer>
              <StyledText size="16px" color="#ffffff" weight="bold">
                {item.name}
              </StyledText>
            </StyledFlexContainer>
            <StyledFlexContainer>
              <StyledText size="13px" color="#ffffff" weight="normal">
                {item.description}
              </StyledText>
            </StyledFlexContainer>
            <div style={{ marginTop: '16px' }}>
              <Row>
                <Col xs={12} xsPush={12}>
                  <InputGroup style={{ width: '100%' }}>
                    <InputGroup.Button onClick={handleMinus}>
                      -
                    </InputGroup.Button>
                    <InputNumber
                      className="custom-input-number"
                      ref={inputRef}
                      value={cartItems[item.id]}
                      onChange={value => {
                        if (parseInt(value) > 0) {
                          this.props.addCartItem({
                            product: item.id,
                            quantity: value,
                          });
                        } else {
                          this.props.removeCartItem({
                            product: item.id,
                          });
                        }
                      }}
                    />
                    <InputGroup.Button onClick={handlePlus}>
                      +
                    </InputGroup.Button>
                  </InputGroup>
                </Col>
                <Col
                  xs={12}
                  xsPull={12}
                  style={{
                    marginTop: '8px',
                    color: 'white',
                    textAlign: 'left',
                  }}
                >
                  {item.price}
                </Col>
              </Row>
            </div>
          </StyledMenuDiv>
        );
      }
    });

    return (
      <div
        style={{
          overflowY: 'scroll',
          backgroundColor: '#030303',
          height: '100%',
          overflowY: 'scroll',
        }}
      >
        <div style={{ textAlign: 'center', height: '100%' }}>
          <CartItems>{itemToRender}</CartItems>
          <Button
            style={{
              position: 'fixed',
              bottom: '0px',
              width: '100%',
              left: '0px',
              backgroundColor: '#3498ff',
              color: '#fff',
              zIndex: '99999',
              border: '0px',
              borderRadius: '0px',
            }}
            onClick={() => {
              this.props.history.push('/auth');
            }}
          >
            Confirm Order -{' '}
            {`${_.size(cartItems || {})} Item${
              _.size(cartItems || {}) > 1 ? 's' : ''
            }`}
          </Button>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  outlet: makeSelectOutletInfo(),
  cartItems: makeSelectCartItems(),
  currentoutlet: makeSelectCurrentOutlet(),
});

function mapDispatchToProps(dispatch) {
  return {
    addCartItem: item => dispatch(addCartItem(item)),
    removeCartItem: item => dispatch(removeCartItem(item)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'outlet', reducer });

export default compose(
  withReducer,
  withConnect,
)(Cart);
