import React from 'react';
import styled, { css } from 'styled-components';

export default class Arrows extends React.Component {
  componentDidMount() {
    document.addEventListener('mouseup', this.stopAction);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.stopAction);
  }

  triggerAction(action) {
    this.interval = setInterval(action, 20);
  };

  stopAction = () => {
    window.clearInterval(this.interval);
  };

  render() {
    const { onNext, onPrev } = this.props;
    const { isDisabled } = this.props;

    return (
      <Container isDisabled={isDisabled}>
        <Btn
          onMouseDown={() => this.triggerAction(onPrev)}
          onTouchStart={() => this.triggerAction(onPrev)}
          onTouchEnd={this.stopAction}>
          <PrevArrow />
        </Btn>
        <Btn
          onMouseDown={() => this.triggerAction(onNext)}
          onTouchStart={() => this.triggerAction(onNext)}
          onTouchEnd={this.stopAction}>
          <Arrow />
        </Btn>
      </Container>
    );
  }
}

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100vw;
  height: 55px;
  display: flex;
  box-sizing: border-box;
  padding: 0 5px;
  
  ${({ isDisabled }) => isDisabled && css`
    pointer-events: none;
    opacity: 0.2;
  `}
`;

const Btn = styled.div`
  flex: 1;
  height: 50px;
  background: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 5px;
`;

const Arrow = styled.div`
  border: solid #fff;
  border-width: 0 3px 3px 0;
  padding: 3px;
  transform: rotate(-45deg);
  width: 6px;
  height: 6px;
`;

const PrevArrow = Arrow.extend`
  transform: rotate(135deg);
`;
