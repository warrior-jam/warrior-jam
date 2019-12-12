import React from 'react';
import { Container, Header, Card, Image } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class About extends React.Component {
  render() {
    return (
        <div className='content'>
          <Container fluid text>
            <Header as="h2" textAlign="center">About Warrior Jam</Header>
            <p>Music has always been an one of the best ways to relieve stress and the university life is surely
                stressful. A lot of UH students also have musical talents, but there is no easy way for them to find
                others with similar tastes and compatible musical abilities. Thus, they cannot experience
                the fun of informal jam sessions which could progress into performing musical groups. </p>
            <p>WarriorJam was initially created to satisfy a requirement in ICS 314: Software Engineering I in Fall
                2019. WarriorJam is a web application that will help UH students (and staff) have their musical talents,
                and interests be discovered by other people with similar interests. The app will give you
                the opportunity to share your music content (YouTube, SoundCloud, etc.) By using our website, you can
                find and meet different people who have the same goals as you do. Who knows? You could be the next
                member of a band like Coldplay, Pink Floyd, Queen, and many more.</p>
            <p>For more info: <a href='https://warrior-jam.github.io/'>Warrior Jam</a></p>
            <Header as="h3" textAlign="center">Developers</Header>
            <Card.Group centered stackable>
              <Card>
                  <Card.Content>
                      <Image
                          floated='right'
                          size='mini'
                          src='https://lcaraang.github.io/images/IMG_3125.JPG'
                      />
                      <Card.Header><h4>Louella Caraang</h4></Card.Header>
                      <div className='card-description'>
                        <Card.Meta>Student</Card.Meta>
                        <Card.Description>
                            I am pursuing a B.S. in Computer Science at the University of Hawaii at Manoa
                            <a href='https://lcaraang.github.io/'> (More...)</a>
                        </Card.Description>
                      </div>
                  </Card.Content>
              </Card>
              <Card>
                  <Card.Content>
                      <Image
                          floated='right'
                          size='mini'
                          src='https://ryan38.github.io/images/myPic3.png'
                      />
                      <Card.Header><h4>Ryan Ganiron</h4></Card.Header>
                      <div className='card-description'>
                        <Card.Meta>Student</Card.Meta>
                        <Card.Description size='mini'>
                            I am studying for a B.S. in Computer Engineering at the University of Hawaii
                            <a href='https://ryan38.github.io/'> (More...)</a>
                        </Card.Description>
                      </div>
                  </Card.Content>
              </Card>
              <Card>
                  <Card.Content>
                      <Image
                          floated='right'
                          size='mini'
                          src='https://avatars0.githubusercontent.com/u/50728170?s=460&v=4'
                      />
                      <Card.Header><h4>Joseph Paragas</h4></Card.Header>
                      <div className='card-description'>
                        <Card.Meta>Student</Card.Meta>
                        <Card.Description>
                            I am studying for a B.S. in Computer Science in the Department of Information
                            <a href='https://joeparagas.github.io/'> (More...)</a>
                        </Card.Description>
                      </div>
                  </Card.Content>
              </Card>
              <Card>
                  <Card.Content>
                      <Image
                          floated='right'
                          size='mini'
                          src='https://dmtapia.github.io/images/IMG_4274.png'
                      />
                      <Card.Header><h4>Daphne Marie Tapia</h4></Card.Header>
                      <div className='card-description'>
                        <Card.Meta>Student</Card.Meta>
                        <Card.Description>
                            I am currently working on my bachelor&#39;s degree in Computer Science at
                            <a href='https://dmtapia.github.io/'> (More...)</a>
                        </Card.Description>
                      </div>
                  </Card.Content>
              </Card>
            </Card.Group>
          </Container>
        </div>
    );
  }
}

export default About;
