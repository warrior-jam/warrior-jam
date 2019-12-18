import React from 'react';
import { Button, Card, Header, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Musicians } from '../../api/musician/Musician';

function getData(email) {
  const data = Musicians.findOne({ email });
  return data;
}

/** Renders a single row in the List musician table. See pages/Listmusician.jsx. */
class Event extends React.Component {

  state = {
    showMessage: false,
  }

  onButtonClickHandler = () => {
    this.setState({ showMessage: true });
  };

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const email = Meteor.userId().email;
    const data = getData(email);
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.event.name}</Card.Header>
            <Card.Meta>{this.props.event.location}</Card.Meta>
            <Card.Meta>{this.props.event.date}</Card.Meta>
            <Card.Description>
              {this.props.event.description}
            </Card.Description>
          </Card.Content>
          <Button onClick={this.onButtonClickHandler}>Going</Button>
          {this.state.showMessage && <p> {data.firstName} {data.lastName} is going.</p>}
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Event.propTypes = {
  event: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Musician');
  return {
    ready: subscription.ready(),
  };
})(Event);
