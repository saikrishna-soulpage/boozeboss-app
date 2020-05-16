import React, { Component } from 'react';
import styled from 'styled-components';
import { Panel, Button, Divider } from 'rsuite';
import moment from 'moment';

const EventTitle = styled.b`
    margin: 0 0 1em 0;
`

const EventListContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
    flex: 1;
`

const EventRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    align-items: center;
`

class EventCard extends Component {

    handleShowInvite = () => {
        const {history, event_guest} = this.props;
        history.push({
            pathname: 'qr-invite',
            state: {
                event: event_guest.event,
            }
        })
    }

    render() {
        const {event_guest} = this.props;
        return (
            <Panel bordered>
                <EventRow>
                    <p>{moment(event_guest.event.started_at).format('DD/MM/YYYY')}</p>
                    <p style={{margin: 0}}>Starting {moment(event_guest.event.started_at).fromNow()}</p>
                </EventRow>
                <EventRow style={{margin: '1em 0 0 0'}}>
                    <b>{event_guest.event.brief_event.name}</b>
                </EventRow>
                <Divider />
                <EventRow>
                    {event_guest.checked_in ? (
                        <Button color="green" block>Menu</Button>
                    ) : (
                        <Button color="green" block onClick={this.handleShowInvite}>Check-In</Button>
                    )}
                </EventRow>
            </Panel>
        )
    }
}

export default class EventList extends Component {
    render() {
        const { events } = this.props;
        return (
            <EventListContainer>
                <EventTitle>My Events</EventTitle>
                {events &&
                    events.length > 0 && 
                    events.map(event_guest => <EventCard {...this.props} event_guest={event_guest}/>) 
                } 
            </EventListContainer>
        )
    }
}
