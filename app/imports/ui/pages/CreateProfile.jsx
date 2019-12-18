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
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';


/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  bio: String,
  picture: String,
  youtube: { type: String, optional: true, defaultValue: '' },
  soundcloud: { type: String, optional: true, defaultValue: '' },
  website: { type: String, optional: true, defaultValue: '' },
  skills: Array,
  'skills.$': { type: String,
    allowedValues:
        ['vocals', 'guitar', 'drums', 'keyboard', 'dj', 'bass guitar', 'composition',
          'producing music', 'songwriting'] },
  genres: Array,
  'genres.$': {
    type: String, allowedValues: ['jazz', 'rock', 'country', 'r&b', 'reggae', 'pop', 'soul', 'disco', 'alternative',
      'blues'],
  },
});

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { firstName, lastName, bio, picture, youtube, soundcloud, website, skills, genres } = data;
    const owner = Meteor.user().username;
    Musicians.insert({ firstName, lastName, bio, picture, youtube, soundcloud, website, skills, genres, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Profile updated successfully', 'success');
            formRef.reset();
            this.setState({ error: '', redirectToReferer: true });
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
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
                  <SubmitField value='Submit'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

CreateProfile.propTypes = {
  location: PropTypes.object,
};

export default CreateProfile;