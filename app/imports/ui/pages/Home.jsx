import React from 'react';
import { Musicians } from '/imports/api/musician/Musician';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  bio: { type: String, label: 'Biographical statement' },
  picture: String,
  projects: { type: String, label: 'Projects', optional: true },
  skills: Array,
  'skills.$': { type: String, allowedValues: ['vocals', 'guitar', 'drums', 'keyboard'] },
  genres: Array,
  'genres.$': {
    type: String, allowedValues: ['jazz', 'rock', 'country', 'r&b', 'reggae', 'pop', 'soul', 'disco', 'alternative',
      'blues'],
  },
  events: { type: Array, optional: true },
  'events.$': { type: String, allowedValues: ['meet1', 'meet2', 'meet3', 'meet4'] },
});

/** Renders the Page for adding a document. */
class Home extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { firstName, lastName, bio, picture, projects, skills, genres, events } = data;
    const owner = Meteor.user().username;
    Musicians.insert({ firstName, lastName, bio, picture, projects, skills, genres, events, owner },
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
        <div className='content'>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Your Profile</Header>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
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

export default Home;
