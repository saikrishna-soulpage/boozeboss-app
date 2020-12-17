import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectCartItems } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getCartItems } from './actions';
import QRCode from 'react-qr-code';
import _ from 'lodash';
import { Button, ButtonGroup } from 'rsuite';

class OrderInfo extends React.Component {
  componentDidMount() {
    this.props.getCartItems();
  }
  render() {
    if (!this.props.cartItems) {
      return <>Loading..</>;
    }
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <QRCode
            value={JSON.stringify({
              user: this.props.cartItems.account_id,
              type: 'orders',
            })}
          />
        </div>
        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '18px' }}>
          {_.size(this.props.cartItems.items)} Items Ordered
        </p>
        <ButtonGroup justified style={{ padding: '15px' }}>
          <Button appearance="ghost">Back to Menu</Button>
          <Button appearance="ghost">Close Bill</Button>
        </ButtonGroup>
      </>
    );
  }
}

OrderInfo.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  cartItems: makeSelectCartItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCartItems: () => dispatch(getCartItems()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'cart', reducer });
const withSaga = injectSaga({ key: 'cart', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrderInfo);
