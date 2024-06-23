import styled from 'styled-components'

interface StyledCardProps {
  image: string
}

export const StyledCard = styled.div`
  text-align: center;
  transition: all 0.3s;
  font-size: 1.6rem;
  width: 400px;

  @media (max-width: 1200px) {
    margin-bottom: 30px;
  }

  @media (max-width: 568px) {
    width: 35rem;
    margin-bottom: 0;
  }

  h2 {
    font-size: 24px;
  }

  p {
    color: #696969;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
  }

  &:hover {
    transform: translate(0, -10px);
  }
`

export const Wrapper = styled.div<StyledCardProps>`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;

  height: auto;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 30px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 568px) {
    margin-top: 7rem;
  }

  img {
    background: ${(props) => `url(${props.image})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 200px;
  }
`
