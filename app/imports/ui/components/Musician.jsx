import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';

/** Renders a single row in the List musician table. See pages/Listmusician.jsx. */
class Musician extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Image floated='right' size='tiny' src={this.props.musician.picture} />
                    <Card.Header>{this.props.musician.firstName} {this.props.musician.lastName}</Card.Header>
                    <Card.Description>
                        {this.props.musician.bio}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {_.map(this.props.musician.skills,
                        (skill, index) => <Label key={index}>{skill}</Label>)}
                    {_.map(this.props.musician.genres,
                        (genre, index) => <Label key={index}>{genre}</Label>)}
                </Card.Content>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
Musician.propTypes = {
    musician: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Musician);