import React from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import LongTextField from 'uniforms-semantic/LongTextField';
import { Musicians, MusicianSchema } from '../../api/musician/Musician';
import MultiSelectField from '../forms/controllers/MultiSelectField'; // required for Uniforms

function getData(email) {
  const data = Musicians.findOne({ email });
  return data;
}
/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, bio, picture, youtube, soundcloud, website, skills, genres, _id } = data;
    Musicians.update(_id, { $set: { firstName, lastName, bio, picture, youtube, soundcloud, website, skills, genres } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Profile updated successfully', 'success');
            this.setState({ error: '', redirectToReferer: true });
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    const email = Meteor.userId().email;
    const thisUser = getData(email);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm schema={MusicianSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='firstName' defaultValue={thisUser.firstName}/>
                  <TextField name='lastName' defaultValue={thisUser.lastName}/>
                </Form.Group>
                <LongTextField name='bio' defaultValue={thisUser.bio}/>
                <Form.Group widths={'equal'}>
                  <TextField name='picture' defaultValue={thisUser.picture}/>
                  <TextField name='website' defaultValue={thisUser.website}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <TextField name='youtube' defaultValue={thisUser.youtube}/>
                  <TextField name='soundcloud' defaultValue={thisUser.soundcloud}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='skills'/>
                  <MultiSelectField name='genres'/>
                </Form.Group>
                <SubmitField value='Submit'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('Musician');
  return {
    doc: Musicians.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);
