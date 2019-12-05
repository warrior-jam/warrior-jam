import React from 'react';
import { Segment, Container, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <footer>
            <div className='footer'>
                <Segment vertical>
                    <Container textAlign='center'>
                        <List horizontal inverted divided link size='small'>
                            <List.Item as='a' href='https://warrior-jam.github.io./'>
                                © 2019 Warrior Jam
                            </List.Item>
                            <List.Item as='text'>
                                University of Hawai&#39;i Honolulu, HI 96822
                            </List.Item>
                            <List.Item as='a' href='#/about'>
                                About
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Contact Us
                            </List.Item>
                        </List>
                    </Container>
                </Segment>
            </div>
        </footer>
    );
  }
}

export default Footer;
