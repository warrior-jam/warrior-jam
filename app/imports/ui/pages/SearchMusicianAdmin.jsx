import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import MusicianAdmin from '/imports/ui/components/MusicianAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Musicians } from '../../api/musician/Musician';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SearchMusicianAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Musicians (Admin)</Header>
            <Card.Group>
              {this.props.musicians.map((musician, index) => <MusicianAdmin key={index} musician={musician}/>)}
            </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
SearchMusicianAdmin.propTypes = {
  musicians: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('MusiciansAdmin');
  return {
    musicians: Musicians.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SearchMusicianAdmin);
