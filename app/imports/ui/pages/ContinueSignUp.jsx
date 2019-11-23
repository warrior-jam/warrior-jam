import React from 'react';
import { Stuffs } from '/imports/api/stuff/Stuff';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import UserSchema from 'simpl-schema';
import LongTextField from 'uniforms-semantic/LongTextField';

/** Renders the Page for adding a document. */
class ContinueSignUp extends React.Component {
  /** On submit, insert the data. */
  submit(data, formRef) {
    const {
      firstName,
      lastName,
      about,
      facebookLink,
      instagramLink,
      youtubeLink,
      soundcloudLink,
      genres,
      instrumentsPlayed } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({
          firstName,
          lastName,
          about,
          facebookLink,
          instagramLink,
          youtubeLink,
          soundcloudLink,
          genres,
          instrumentsPlayed,
          owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile updated successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Stuff</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={UserSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='firstName'/>
                <TextField name='LastName'/>
                <LongTextField name='about'/>
                <TextField name='facebookLink'/>
                <TextField name='instagramLink'/>
                <TextField name='youtubeLink'/>
                <TextField name='soundcloudLink'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default ContinueSignUp;
