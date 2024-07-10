import { Plugin, TooltipModel } from 'chart.js'

// Chart.js 플러그인 생성
export const highlightGridPlugin: Plugin<'line'> = {
  id: 'highlightGrid',
  beforeDraw: (chart) => {
    const tooltip = chart.tooltip as TooltipModel<'line'>
    if (tooltip && tooltip.dataPoints && tooltip.dataPoints.length > 0) {
      const activePoint = tooltip.dataPoints[0]
      const ctx = chart.ctx
      const x = activePoint.element.x
      const topY = chart.scales.y.top
      const bottomY = chart.scales.y.bottom
      // 현재 drawing state 저장
      ctx.save()
      // vertical line 그리기
      ctx.beginPath()
      ctx.moveTo(x, topY)
      ctx.lineTo(x, bottomY)
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.stroke()

      ctx.restore()
    }
  },
}
