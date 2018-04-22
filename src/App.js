import React, { Component } from 'react';
import styled from 'styled-components';

import Navigation from './components/navigation';
import Loader from './components/loader';
import Scene from './three-scene/scene';

import Colors from './components/colors';
import Arrows from './components/arrows';

class App extends Component {
  state = {
    demoId: null,
    loading: false
  };

  scene = new Scene();

  handleRef = el => {
    if (el) {
      const actions = {
        toggleLoading: this.toggleLoading
      };

      this.scene.init(el, actions);
    }
  };

  handleLoad = demoId => {
    this.setState({ demoId }, () => {
      this.scene.loadDemo(demoId);
    });
  };

  clearDemo = () => {
    this.setState({ demoId: null });
  };

  demoInterface() {
    const { demoId } = this.state;

    switch (demoId) {
      case 'demo-01':
        return <Colors scene={this.scene} />;
      case 'demo-02':
        return (
          <Arrows
            onNext={() => this.scene.getDemo().twist(true)}
            onPrev={() => this.scene.getDemo().twist()}
          />
        );
      case 'demo-03':
        return (
          <Info>
            Demo of a physics engine with Three.js (cannon.js)
          </Info>
        );
      case 'demo-04':
        return (
          <Info>
            Add velocity to objects using sound
          </Info>
        );
      default:
        return null;
    }
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Navigation onLoad={this.handleLoad} clearDemo={this.clearDemo} />

        {loading && <Loader />}

        {this.demoInterface()}

        <OrbitIcon />

        <Placeholder innerRef={this.handleRef} />
      </div>
    );
  }
}

export default App;

const Placeholder = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Info = styled.div`
  font-size: 16px;
  color: #e0e0e0;
  width: 100vw;
  height: 100px;
  pointer-events: none;
  box-sizing: border-box;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
`;

const OrbitIcon = styled.div`
  width: 40px;
  height: 40px;
  position: fixed;
  top: 15px;
  right: 15px;
  pointer-events: none;
  background: url(${require('./assets/orbit.svg')}) no-repeat;
  background-size: contain;
`;
