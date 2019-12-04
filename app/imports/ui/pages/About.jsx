import React from 'react';
import { Container, Header } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class About extends React.Component {
  render() {
    return (
      <Container fluid text>
        <Header as="h2" textAlign="center" inverted>About Warrior Jam</Header>
        <p>Music has always been an one of the best ways to relieve stress and the university life is surely stressful.
            A lot of UH students also have musical talents, but there is no easy way for them to find
            others with similar tastes and compatible musical abilities. Thus, they cannot experience
            the fun of informal jam sessions which could progress into performing musical groups. </p>
        <p>WarriorJam was initially created to satisfy a requirement in ICS 314: Software Engineering I in Fall 2019.
            WarriorJam is a web application that will help UH students (and staff) have their musical talents, and
            interests be discovered by other people with similar interests. The app will give you
            the opportunity to share your music content (YouTube, SoundCloud, etc.) By using our website, you can
            find and meet different people who have the same goals as you do. Who knows? You could be the next member of
            a band like Coldplay, Pink Floyd, Queen, and many more.</p>
      </Container>

    );
  }
}

export default About;
