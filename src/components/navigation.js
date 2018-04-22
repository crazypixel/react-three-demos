import React, { Component } from 'react';
import styled from 'styled-components';

export default class Navigation extends Component {
  state = {
    visible: true
  };

  backButton() {
    return (
      <BackButton onClick={() => this.setState({ visible: true }, this.props.clearDemo)}>
        <BackArrow />
      </BackButton>
    );
  }

  loadDemo(id) {
    this.setState({ visible: false }, () => {
      this.props.onLoad(id);
    });
  }

  menu() {
    const links = [
      { label: 'materials & bump map', id: 'demo-01' },
      { label: 'mesh manipulation', id: 'demo-02' },
      { label: 'physics', id: 'demo-03' },
      { label: 'physics & microphone', id: 'demo-04' }
    ];

    return (
      <Container>
        <Logo />
        <div>
          {
            links.map(({ label, id }) => (
              <MenuItem key={id} onClick={() => this.loadDemo(id)}>{label}<Arrow /></MenuItem>
            ))
          }
        </div>
        <BottomLinks>
          <BottomLink href="mailto:crazypixel@gmail.com">email</BottomLink>
          <BottomLink href="https://github.com/crazypixel">github</BottomLink>
        </BottomLinks>
      </Container>
    );
  }

  render() {
    return this.state.visible ? this.menu() : this.backButton();
  }
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 50px;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: 191px;
  height: 50px;
  background: url(${require('../assets/logo.svg')}) no-repeat;
  background-size: contain;
`;

const MenuItem = styled.div`
  font-size: 20px;
  text-transform: capitalize;
  padding: 20px 0;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding: 20px 0;
  border-bottom: 1px solid #222;
`;

const Arrow = styled.div`
  border: solid #fff;
  border-width: 0 1px 1px 0;
  padding: 3px;
  transform: rotate(-45deg);
  width: 6px;
  height: 6px;
`;

const BackButton = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  top: 10px;
  left: 10px;
  background: #444;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackArrow = Arrow.extend`
  transform: rotate(135deg);
`;

const BottomLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottomLink = styled.a`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 300;
  color: #ff4545;
  text-decoration: none;
`;
