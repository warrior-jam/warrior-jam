import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { OpenMics } from '/imports/api/openmic/OpenMic';
import OpenMic from '/imports/ui/components/OpenMic';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class BrowseOpenMics extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='content'>
          <Container>
            <Header as="h2" textAlign="center">Open Mic Events Near You</Header>
            <Card.Group itemsPerRow={4}>
              {this.props.openmics.map((openmic, index) => <OpenMic key={index} openmic={openmic}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
BrowseOpenMics.propTypes = {
  openmics: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('OpenMic');
  return {
    openmics: OpenMics.find({}).fetch(),
    ready: subscription.ready(),
  };
})(BrowseOpenMics);
