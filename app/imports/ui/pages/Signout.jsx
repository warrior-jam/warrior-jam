import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
        <div className='signout-background' >
          <Grid columns={4}>
            <Grid.Column textAlign='center'>
              <div className='landing-background-profile-icon'>
                <Icon size='huge' name='address card'/>
                <Header as='h1' size='large' inverted>CREATE A PROFILE</Header>
              </div>
            </Grid.Column>


            <Grid.Column textAlign='center'>
              <div className='landing-background-headphone-icon'>
                <Icon size='huge' name='headphones'/>
                <Header as='h1' size='large' inverted>BROWSE MUSIC</Header>
              </div>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <div className='landing-background-upload-icon'>
                <Icon size='huge' name='upload'/>
                <Header as='h1' size='large' inverted>UPLOAD CONTENT</Header>
              </div>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <div className='landing-background-discovered-icon'>
                <Icon size='huge' name='users'/>
                <Header as='h1' size='large' inverted>GET DISCOVERED</Header>
              </div>
            </Grid.Column>

          </Grid>
        </div>
    );
  }
}
