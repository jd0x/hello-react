import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import {getUserDetails} from './api';

class UserInfo extends React.Component {

  constructor() {
    super()
    this.state = {
      articles: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      isLoading: true
    })
    getUserDetails().then(userDetails => {
      //Update the state with the fetched articles
      this.setState((prevState) => ({
        isLoading: false,
        userDetails: userDetails
      }));
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>Loading</div>
      );
    }
    return (
      <div>
        <Card>
          <CardText>
            This component utilizes the hasura data APIs. In this example, it fetches a list of articles from the articles table which has been pre created and already loaded with some dummy data. To check out how the data API is used to render this view, check out services/ui/app/src/hasuraExamples/Data.js. A good exercise would be to also show the author details for each of these articles.
          </CardText>
        </Card>
        <h1>Welcome ! {this.state.userDetails.username}</h1>
      </div>
    );
  }
}

export {
  UserInfo
};
