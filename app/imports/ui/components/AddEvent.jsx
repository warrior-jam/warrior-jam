import React from 'react';
import { Events } from '/imports/api/event/Event';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import LongTextField from 'uniforms-semantic/LongTextField';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  location: String,
  date: String,
  description: String,
});

/** Renders the Page for adding a document. */
class AddEvent extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, location, date, description } = data;
    const owner = Meteor.user().username;
    Events.insert({ name, location, date, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event added successfully', 'success');
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
            <Header as="h2" textAlign="center">Add Event</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name' placeholder={'Event Name'}/>
                <Form.Group widths={'equal'}>
                  <TextField name='location' placeholder={'Location'}/>
                  <TextField name='date' placeholder={'Date'}/>
                </Form.Group>
                <LongTextField name='description' placeholder='Description of event.'/>
                <SubmitField value='Submit'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddEvent;
