import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List musician table. See pages/Listmusician.jsx. */
class OpenMic extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.openmic.name}</Card.Header>
                    <Card.Meta>{this.props.openmic.location}</Card.Meta>
                    <Card.Meta>{this.props.openmic.phoneNumber}</Card.Meta>
                    <Card.Description>
                        {this.props.openmic.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    Website: <a href={this.props.openmic.website}>{this.props.openmic.name}</a>
                </Card.Content>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
OpenMic.propTypes = {
    openmic: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(OpenMic);
