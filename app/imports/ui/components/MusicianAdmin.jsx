import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List musician table. See pages/Listmusician.jsx. */
class MusicianAdmin extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.musician.firstName} {this.props.musician.lastName}</Card.Header>
            <Card.Meta>{this.props.musician.genre}</Card.Meta>
            <Card.Description>
              {this.props.musician.instrument}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.musician.owner}
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
MusicianAdmin.propTypes = {
  musician: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MusicianAdmin);
