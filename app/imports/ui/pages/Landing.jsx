import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='landing-background'>
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

export default Landing;
