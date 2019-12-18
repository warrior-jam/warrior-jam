import React from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';
import LongTextField from 'uniforms-semantic/LongTextField';
import { Musicians, MusicianSchema } from '../../api/musician/Musician';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, bio, picture, youtube, soundcloud, website, skills, genres, _id } = data;
    Musicians.update(_id, { $set: { firstName, lastName, bio, picture, youtube, soundcloud, website, skills, genres } },
        (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm schema={MusicianSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='firstName' placeholder={'First Name'}/>
                  <TextField name='lastName' placeholder={'Last Name'}/>
                </Form.Group>
                <LongTextField name='bio' placeholder='Write a little bit about yourself.'/>
                <Form.Group widths={'equal'}>
                  <TextField name='picture' placeholder={'URL to picture'}/>
                  <TextField name='website' optional={true} placeholder={'Link to Website'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <TextField name='youtube' optional={true} placeholder={'Link to Youtube channel'}/>
                  <TextField name='soundcloud' optional={true} placeholder={'Link to Soundcloud feed'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='skills' placeholder={'Skills'}/>
                  <MultiSelectField name='genres' placeholder={'Genres'}/>
                </Form.Group>
                <ErrorsField/>
                <HiddenField name='owner' />
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
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Musician');
  return {
    doc: Musicians.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);
