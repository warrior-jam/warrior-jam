import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Button, Grid } from 'semantic-ui-react';
import Event from '/imports/ui/components/Event';
import { Events } from '/imports/api/event/Event';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class BrowseEvents extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='content'>
          <Container>
            <Header as="h2" textAlign="center">Events</Header>
            <Card.Group itemsPerRow={4}>
              {this.props.events.map((event, index) => <Event key={index} event={event}/>)}
            </Card.Group>
            <Card><Button as={NavLink} activeClassName="active" exact to="/addEvent" key='addEvent'>
              Add Event
            </Button>
          </Card>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
BrowseEvents.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Events');
  return {
    events: Events.find({}).fetch(),
    ready: subscription.ready(),
  };
})(BrowseEvents);
