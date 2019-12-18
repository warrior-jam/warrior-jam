import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Dropdown, Grid, Modal, Icon, Button } from 'semantic-ui-react';
import { Musicians } from '/imports/api/musician/Musician';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Musician from '/imports/ui/components/Musician';
import '/imports/ui/pages/BrowseMusicians.css';

// 9 skill types
const skills_type = [
  { key: 'bass guitar', text: 'bass guitar', value: 'bass guitar' },
  { key: 'composition', text: 'composition', value: 'composition' },
  { key: 'dj', text: 'dj', value: 'dj' },
  { key: 'drums', text: 'drums', value: 'drums' },
  { key: 'guitar', text: 'guitar', value: 'guitar' },
  { key: 'keyboard', text: 'keyboard', value: 'keyboard' },
  { key: 'producing music', text: 'producing music', value: 'producing music' },
  { key: 'songwriting', text: 'songwriting', value: 'songwriting' },
  { key: 'vocals', text: 'vocals', value: 'vocals' },
];
// 10 genres
const genre_type = [
  { key: 'alternative', text: 'alternative', value: 'alternative' },
  { key: 'blues', text: 'blues', value: 'blues' },
  { key: 'country', text: 'country', value: 'country' },
  { key: 'disco', text: 'disco', value: 'disco' },
  { key: 'jazz', text: 'jazz', value: 'jazz' },
  { key: 'pop', text: 'pop', value: 'pop' },
  { key: 'r&b', text: 'r&b', value: 'r&b' },
  { key: 'reggae', text: 'reggae', value: 'reggae' },
  { key: 'rock', text: 'rock', value: 'rock' },
  { key: 'soul', text: 'soul', value: 'soul' },
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class BrowseMusicians extends React.Component {
  constructor() {
    super();
    this.handleSkillSubmit = this.handleSkillSubmit.bind(this);
    this.handleGenreSubmit = this.handleGenreSubmit.bind(this);
    // this.iterateGen = this.iterateGen.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.updateModalStateOpen = this.updateModalStateOpen.bind(this);
    this.updateModalStateClose = this.updateModalStateClose.bind(this);
    this.state = {
      tentativeSkill: [],
      tentativeGenre: [],
      selectedSkill: [],
      selectedGenre: [],
      modalOpen: false,
    };
  }

  handleSkillSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeSkill: data.value });
  }

  handleGenreSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeGenre: data.value });
  }

  handleApply(event) {
    event.preventDefault();
    this.setState({ selectedSkill: this.state.tentativeSkill });
    this.setState({ selectedGenre: this.state.tentativeGenre });

    this.setState({ modalOpen: false });
  }

  updateModalStateOpen(event) {
    event.preventDefault();
    this.setState({ modalOpen: true });
  }

  updateModalStateClose(event) {
    event.preventDefault();
    this.setState({ modalOpen: false });
  }

  /*
  iterateGen() {
    const Genres = this.state.selectedGenre;
    let filtered = this.props.musicians;
    const arr = [];
    for (let i = 0; i < Genres.length; i++) {
      if (i === 0) {
        filtered = this.props.musicians.filter(m => Genres.length === 0 ||
            m.Genres.indexOf(Genres[i]) !== -1);
        arr.push(filtered);
      } else {
        filtered = arr[arr.length - 1].filter(m => Genres.length === 0 ||
            m.Genres.indexOf(Genres[i]) !== -1);
        arr.push(filtered);
      }
    }

    if (arr.length > 0) {
      filtered = arr[arr.length - 1];
    } else {
      filtered = this.props.musicians;
    }
    return filtered;
  }

  */


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  filterMusiciansbyType() {
    const skill = this.state.selectedSkill;
    const genre = this.state.selectedGenre;
    // let postGenFilter = this.state.selectedGenre;
    // postGenFilter = this.iterateGen();
    // return postGenFilter.filter(m => skill.length === 0 || (skill.indexOf(m.skill) !== -1));
    return this.props.musicians.filter(m => skill.length === 0 || (skill.indexOf(m.skills) !== -1))
        .filter(m => genre.length === 0 || (genre.indexOf(m.genres) !== -1));
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='content'>
          <Container>
            <Header as="h2" textAlign="center">Browse Musicians</Header>
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Modal open={this.state.modalOpen} onClose={this.updateModalStateClose}
                         trigger={<Button onClick={this.updateModalStateOpen}>Filter Musicians By</Button>
                         } closeIcon>
                    <Header icon='filter' content='Filters'/>
                    <Modal.Content>
                      <Grid columns={2}>
                        <Grid.Column>
                          <p>
                            Musician Skill
                            <Dropdown
                                multiple selection
                                button
                                options={skills_type}
                                placeholder='Select Skill'
                                value={this.state.tentativeSkill}
                                onChange={this.handleSkillSubmit}
                            />
                          </p>
                        </Grid.Column>
                        <Grid.Column>
                          <p>
                            Musician Genre
                            <Dropdown
                                multiple selection
                                button
                                options={genre_type}
                                placeholder='Select Genre'
                                value={this.state.tentativeGenre}
                                onChange={this.handleGenreSubmit}
                            />
                          </p>
                        </Grid.Column>
                      </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color='green' onClick={this.handleApply}>
                        <Icon name='checkmark'/> Apply
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Card.Group>
              {this.filterMusiciansbyType().map((musician, index) => <Musician key={index} musician={musician}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
BrowseMusicians.propTypes = {
  musicians: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Musician2');
  return {
    musicians: Musicians.find({}).fetch(),
    ready: subscription.ready(),
  };
})(BrowseMusicians);
