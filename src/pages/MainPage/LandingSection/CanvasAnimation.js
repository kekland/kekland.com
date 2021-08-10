
export const hexToRgbA = (hex) => {
  let c;
  c = hex.substring(1).split('');
  c = '0x' + c.join('');

  return {
    r: (c >> 16) & 255,
    g: (c >> 8) & 255,
    b: (c & 255),
  }
}

export const generateArcs = ({
  num,
  minRadius,
  maxRadius,
  minAngle,
  maxAngle,
  minPeriod,
  maxPeriod,
  colors,
}) => {
  const arcs = []

  for (let i = 0; i < num; i++) {
    const radius = minRadius + (maxRadius - minRadius) * Math.random()
    const angle = minAngle + (maxAngle - minAngle) * Math.random()
    const period = minPeriod + (maxPeriod - minPeriod) * Math.random()
    const color = colors[Math.floor(colors.length * Math.random())]

    const t = Math.random()

    arcs.push({ radius, period, t, angle, color })
  }

  return arcs
}

const easing = {
  easeOutQuad: t => t * (2 - t),
}

const getPointOnArc = ({ cx, cy, radius, angle }) => {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  }
}

let initTime
export const draw = ({ arcs, ctx, width, height, fadeIn }) => {
  if (!initTime) {
    initTime = Date.now()
  }

  ctx.clearRect(0, 0, width, height)

  const time = Date.now()
  const timePassed = (time - initTime) / 1000

  const _t = easing.easeOutQuad(Math.min(1, timePassed / 1))

  for (const arc of arcs) {
    const t = (arc.t + (timePassed / arc.period)) % 1
    const startAngle = t * Math.PI * 2
    const endAngle = arc.angle + startAngle

    const startPoint = getPointOnArc({
      cx: width / 2,
      cy: height / 2,
      radius: arc.radius,
      angle: startAngle,
    })

    const endPoint = getPointOnArc({
      cx: width / 2,
      cy: height / 2,
      radius: arc.radius,
      angle: endAngle,
    })

    const gradient = ctx.createLinearGradient(
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y,
    )

    const transparentStop = fadeIn ? 1.0 - 0.1 * _t : 0.9

    gradient.addColorStop(transparentStop, `rgba(${arc.color.r}, ${arc.color.g}, ${arc.color.b}, 0)`)
    gradient.addColorStop(1.0, `rgba(${arc.color.r}, ${arc.color.g}, ${arc.color.b}, 1)`)

    ctx.beginPath()
    ctx.arc(width / 2, height / 2, arc.radius, startAngle, arc.angle + startAngle)
    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.stroke()
  }
}