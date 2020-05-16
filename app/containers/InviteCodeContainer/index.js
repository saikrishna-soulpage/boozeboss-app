/**
 *
 * InviteCodeContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// import makeSelectInviteCodeContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Panel, Loader, Button, Divider} from 'rsuite';
import { makeSelectCode } from './selectors';
import {getInviteCode } from './actions'
import QRCode from "react-qr-code";

const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  justify-content: center;
  flex: 1;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

const QRSection = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 1em;  
`

/* eslint-disable react/prefer-stateless-function */
export class InviteCodeContainer extends React.PureComponent {

  componentDidMount = () => {
    const {history, getInviteCode} = this.props;
    const {state} = history.location;
    
    if (!state || !state.event || !state.event.id) {
      history.push({pathname: '/'})
    } else {
      getInviteCode(state.event.id)
    }
  }

  render() {
    const {code, history} = this.props;
    const {state} = history.location;
    return (
      <InviteContainer>
        {state.event && (
          <Panel bordered>
            <InfoSection>
              <h5>{state.event.brief_event.name}</h5>
              <p>{moment(state.event.started_at).format('DD/MM/YYYY LT')}</p>
            </InfoSection>
            <Divider />
            <p>Please scan this code in the venue entrance to check-in into the event.</p>
            <QRSection>
              {code ? (
                <QRCode value={`${process.env.SCHEMA}://${process.env.HOST}${process.env.PORT && `:${process.env.PORT}`}/check-in/${code}`}/>
              ) : (
                <Loader />
              )}
            </QRSection>
            <Button block color="green" onClick={() => this.props.history.goBack()}>
              Go Back
            </Button>
          </Panel>
        )}
      </InviteContainer>
    );
  }
}

InviteCodeContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    getInviteCode: (event_id) => dispatch(getInviteCode(event_id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'inviteCode', reducer });
const withSaga = injectSaga({ key: 'inviteCode', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InviteCodeContainer);
