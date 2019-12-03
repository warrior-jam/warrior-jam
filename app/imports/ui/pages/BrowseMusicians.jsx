import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import Musician from '/imports/ui/components/Musician';
import { Stuffs } from '/imports/api/stuff/Stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SearchMusician extends React.Component {

  musicians = [{
      name: 'Jason Mraz',
      instrument: 'vocals and guitar',
      genre: 'Reggae',
    },
    {
      name: 'Michael Jackson',
      instrument: 'vocals',
      genre: 'Pop, Soul, Disco',
    },
    {
      name: 'John Mayor',
      instrument: 'vocals and guitar',
      genre: 'Pop, Alternative, Blues',
    }
  ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Musicians</Header>
            <Card.Group>
              {this.musicians.map((musician, index) => <Musician key={index} musician={musician}/>)}
            </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
SearchMusician.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SearchMusician);
