import React from 'react';
import styled from 'styled-components';

export default class Colors extends React.Component {
  state = {
    selected: 3
  };

  handleClick = (id, color) => {
    this.setState({ selected: id }, () => {
      this.props.scene.getDemo().setColor(color);
    });
  };

  render() {
    const { selected } = this.state;
    const colors = [
      { hex: '#f44737', id: 0, threeColor: 0xc82f00 },
      { hex: '#512DA8', id: 1, threeColor: 0x48007a },
      { hex: '#FFC107', id: 2, threeColor: 0xffc200 },
      { hex: '#000F3E', id: 3, threeColor: 0xd75 },
      { hex: '#E91E63', id: 4, threeColor: 0x750037 }
    ];

    return (
      <Container>
        {
          colors.map(({ id, hex, threeColor }) => (
            <Color onClick={() => this.handleClick(id, threeColor)}
                   key={id}
                   color={hex}
                   selected={id === selected}
            />
          ))
        }
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 20px;
  left: 0;
  width: 100vw;
  justify-content: space-evenly;
`;

const Color = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: ${({ color }) => color};
  box-sizing: border-box;
  border: 3px solid;
  border-color: ${({ selected }) => selected ? '#fff' : 'transparent'};
`;
