import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 50px 80px 0;
`

export const CardContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
`

export const ChartContainer = styled.div`
  padding: 100px 100px 0;
`

export const BarContainer = styled.div`
  width: 100%;
`

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Layout = styled.div`
  width: 100%;
  height: 80vh;
`

export const SelectWrapper = styled.div`
  position: relative;
  left: 50px;
  top: 50px;
`
export const RadarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;

  padding: 30px 0;

  .image {
    padding: 10px;
    position: absolute;
    top: 24%;
    right: 10px;
    max-width: 30%;
    height: auto;

    img {
      width: 100%;
      height: auto;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    canvas {
      max-width: 100%;
    }
  }
`
