import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import 'bootstrap/scss/bootstrap.scss';
import style from "./index.css";
import { Animated } from "react-animated-css";
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [ 'Open Sans Condensed:300', 'sans-serif', 'Lato' ]
  }
});

import SearchInput from './components/search_input';
import VideoPlayer from './components/video_player';
import VideoList from './components/video_list';

const API_KEY = 'AIzaSyCWYprpoqNQzdaSiuvto7pX8YwHjwBrBFc';

class App extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      videos: [],
      videoSelected: null
    };

    this.VideoSearchFunc( 'redux' );
  }

  VideoSearchFunc( term ) {
    YTSearch({
      key: API_KEY,
      term: term
    }, ( videos ) => {
      this.setState({videos: videos, videoSelected: videos[0]})
    });
  }

  render( ) {
    const videosListFounded = _.debounce((term) => {this.VideoSearchFunc(term)}, 300);
    return (
      <div className="container">
        <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
          <SearchInput onInputChange={videosListFounded}/>
          <div className="row">
            <VideoPlayer video={this.state.videoSelected}/>
            <VideoList
              onVideoSelect={videoSelected => this.setState({ videoSelected })}
              videos={this.state.videos}/>
          </div>
        </Animated>
      </div>
    )

  }
}

ReactDOM.render(
  <App/>, document.querySelector( '.app' ));
