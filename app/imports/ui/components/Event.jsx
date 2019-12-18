import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List musician table. See pages/Listmusician.jsx. */
class Event extends React.Component {
    render() {
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
              <Button>Sign Up</Button>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
Event.propTypes = {
    event: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Event);
