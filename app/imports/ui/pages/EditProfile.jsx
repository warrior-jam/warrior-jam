import React from 'react';
import { Musicians, MusicianSchema } from '/imports/api/musician/Musician';
import { Form, Grid, Loader, Header, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Renders the Page for adding a document. */
class EditProfile extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { firstName, lastName, bio, picture, projects, skills, genres, events, _id } = data;
    Musicians.update(_id, { $set: { firstName, lastName, bio, picture, projects, skills, genres, events } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Profile updated successfully', 'success');
          }
        });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <div className='content'>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Your Profile</Header>
              <AutoForm schema={MusicianSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                <Segment>
                  <Form.Group widths={'equal'}>
                    <TextField name='firstName' placeholder={'First Name'}/>
                    <TextField name='lastName' placeholder={'Last Name'}/>
                  </Form.Group>
                  <LongTextField name='bio' placeholder='Write a little bit about yourself.'/>
                  <Form.Group widths={'equal'}>
                    <TextField name='picture' placeholder={'URL to picture'}/>
                    <TextField name='projects' optional={true} placeholder={'Link to Youtube or SoundCloud channel'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <MultiSelectField name='skills' placeholder={'Skills'}/>
                    <MultiSelectField name='genres' placeholder={'Genres'}/>
                    <MultiSelectField name='events' placeholder={'Events'}/>
                  </Form.Group>
                  <SubmitField value='Update'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
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
  const subscription = Meteor.subscribe('Musician');
  return {
    doc: Musicians.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);
