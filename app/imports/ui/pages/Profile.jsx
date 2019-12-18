import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Header, Loader, Image, Label, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Musicians } from '../../api/musician/Musician';

/** Returns the data from the user */
/** patterned from bowfolios/Profiles.jsx */
function getData(email) {
  const data = Musicians.findOne({ email });
  return data;
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const email = Meteor.userId().email;
    const data = getData(email);
    let sites = false;
    if (data.website !== '' || data.youtube !== '' || data.soundcloud !== '') {
      sites = true;
    }
    const mailto = `mailto:${data.owner}`;
    return (
        <div className='content'>
          <Container centered fluid text>
            <Grid verticalAlign='middle' columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Image src={data.picture} size='small' circular />
                </Grid.Column>
                <Grid.Column textAlign="right" >
                  <br />
                  <Header as="h1" style={ { color: '#024731' } }>
                    {data.firstName} {data.lastName}
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row> </Grid.Row>
              <Grid.Row divided>
                <Grid.Column textAlign="right" width={4}>
                  <Header as="h3">
                    About The User
                  </Header>
                </Grid.Column>
                <Grid.Column width={11}>
                  <div className='bio'>
                    {data.bio}
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row divided>
                <Grid.Column textAlign="right" width={4}>
                  <Header as="h3">
                    Skills
                  </Header>
                </Grid.Column>
                <Grid.Column width={11}>
                  <div className='bio'>
                    {data.skills.map((skill, index) => <Label
                        key={index}
                        size='medium'
                        basic>
                      {skill}
                    </Label>)}
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row divided>
                <Grid.Column textAlign="right" width={4}>
                  <Header as="h3">
                    Genre
                  </Header>
                </Grid.Column>
                <Grid.Column width={11}>
                  <div className='bio'>
                    {data.genres.map((genre, index) => <Label
                        key={index}
                        size='medium'
                        basic>
                      {genre}
                    </Label>)}
                  </div>
                </Grid.Column>
              </Grid.Row>
              {sites ? (
                  <Grid.Row divided>
                    <Grid.Column textAlign="right" width={4}>
                      <Header as="h3">
                        Websites
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={11}>
                      <div className='bio'>
                        <List>
                          {data.website ? (<List.Item><a href={data.website}>Website</a></List.Item>) : ''}
                          {data.youtube ? (<List.Item><a href={data.youtube}>Youtube</a></List.Item>) : ''}
                          {data.soundcloud ? (<List.Item><a href={data.youtube}>Soundcloud</a></List.Item>) : ''}
                        </List>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
              ) : ''}
              <Grid.Row divided>
                <Grid.Column textAlign="right" width={4}>
                  <Header as="h3">
                    Contact {data.firstName} {data.lastName}
                  </Header>
                </Grid.Column>
                <Grid.Column width={11}>
                  <div className='bio'>
                    <a href={mailto}>{data.owner}</a>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Profile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Musician');
  return {
    ready: subscription.ready(),
  };
})(Profile);
