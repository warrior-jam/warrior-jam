import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='landing-background'>
          <Grid container centered stackable columns={4}>

            <Grid.Column textAlign='center'>
              <div className='landing-background-icon'>
                <Icon size='huge' name='address card'/>
                <Header as='h1' inverted>CREATE A PROFILE</Header>
                <Header as='h3' inverted>The WarriorJam application allows UH students to login and create a profile
                  indicating their musical tastes and capabilities.</Header>
              </div>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <div className='landing-background-icon'>
                <Icon size='huge' name='upload'/>
                <Header as='h1' inverted>UPLOAD CONTENT</Header>
                <Header as='h3' inverted>The profile can also include links to YouTube videos or SoundCloud tracks with
                  examples of their musicianship.</Header>
              </div>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <div className='landing-background-icon'>
                <Icon size='huge' name='headphones'/>
                <Header as='h1' inverted>BROWSE MUSICIANS</Header>
                <Header as='h3' inverted>Users can browse profiles filtered by specific tastes and capabilities to
                  find compatible musicians to contact.</Header>
              </div>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <div className='landing-background-icon'>
                <Icon size='huge' name='users'/>
                <Header as='h1' inverted>CONNECT WITH OTHER MUSICIANS</Header>
                <Header as='h3' inverted>Users can post and browse musical events (informal jam sessions and
                  band member auditions) happening in the UH community filtered by
                  specific taste or participants.</Header>
              </div>
            </Grid.Column>

          </Grid>
        </div>
    );
  }
}

export default Landing;
