import type { ShapeDefinition } from '@/types/index'
import { shapeRegistry } from './registry'

const singleDot: ShapeDefinition = {
  id: 'singleDot',
  name: 'Single Dot',
  category: 'marathon',
  render(x, y, size, color) {
    const scale = size / 100
    return `<rect x="${x + -6.0 * scale}" y="${y + -6.0 * scale}" width="${12.0 * scale}" height="${12.0 * scale}" rx="2" fill="${color}"/>`
  }
}

const quadDots: ShapeDefinition = {
  id: 'quadDots',
  name: 'Quad Dots',
  category: 'marathon',
  render(x, y, size, color) {
    const scale = size / 100;
    return `<path fill-rule="evenodd" clip-rule="evenodd" d="M${x + (40.00) * scale} ${y + (-50.00) * scale}C${x + (38.90) * scale} ${y + (-50.00) * scale} ${x + (38.00) * scale} ${y + (-49.10) * scale} ${x + (38.00) * scale} ${y + (-48.00) * scale}V${y + (-40.00) * scale}C${x + (38.00) * scale} ${y + (-38.90) * scale} ${x + (38.90) * scale} ${y + (-38.00) * scale} ${x + (40.00) * scale} ${y + (-38.00) * scale}H${x + (48.00) * scale}C${x + (49.10) * scale} ${y + (-38.00) * scale} ${x + (50.00) * scale} ${y + (-38.90) * scale} ${x + (50.00) * scale} ${y + (-40.00) * scale}V${y + (-48.00) * scale}C${x + (50.00) * scale} ${y + (-49.10) * scale} ${x + (49.10) * scale} ${y + (-50.00) * scale} ${x + (48.00) * scale} ${y + (-50.00) * scale}H${x + (40.00) * scale}ZM${x + (40.00) * scale} ${y + (38.00) * scale}C${x + (38.90) * scale} ${y + (38.00) * scale} ${x + (38.00) * scale} ${y + (38.90) * scale} ${x + (38.00) * scale} ${y + (40.00) * scale}V${y + (48.00) * scale}C${x + (38.00) * scale} ${y + (49.10) * scale} ${x + (38.90) * scale} ${y + (50.00) * scale} ${x + (40.00) * scale} ${y + (50.00) * scale}H${x + (48.00) * scale}C${x + (49.10) * scale} ${y + (50.00) * scale} ${x + (50.00) * scale} ${y + (49.10) * scale} ${x + (50.00) * scale} ${y + (48.00) * scale}V${y + (40.00) * scale}C${x + (50.00) * scale} ${y + (38.90) * scale} ${x + (49.10) * scale} ${y + (38.00) * scale} ${x + (48.00) * scale} ${y + (38.00) * scale}H${x + (40.00) * scale}ZM${x + (-50.00) * scale} ${y + (40.00) * scale}C${x + (-50.00) * scale} ${y + (38.90) * scale} ${x + (-49.10) * scale} ${y + (38.00) * scale} ${x + (-48.00) * scale} ${y + (38.00) * scale}H${x + (-40.00) * scale}C${x + (-38.90) * scale} ${y + (38.00) * scale} ${x + (-38.00) * scale} ${y + (38.90) * scale} ${x + (-38.00) * scale} ${y + (40.00) * scale}V${y + (48.00) * scale}C${x + (-38.00) * scale} ${y + (49.10) * scale} ${x + (-38.90) * scale} ${y + (50.00) * scale} ${x + (-40.00) * scale} ${y + (50.00) * scale}H${x + (-48.00) * scale}C${x + (-49.10) * scale} ${y + (50.00) * scale} ${x + (-50.00) * scale} ${y + (49.10) * scale} ${x + (-50.00) * scale} ${y + (48.00) * scale}V${y + (40.00) * scale}ZM${x + (-48.00) * scale} ${y + (-50.00) * scale}C${x + (-49.10) * scale} ${y + (-50.00) * scale} ${x + (-50.00) * scale} ${y + (-49.10) * scale} ${x + (-50.00) * scale} ${y + (-48.00) * scale}V${y + (-40.00) * scale}C${x + (-50.00) * scale} ${y + (-38.90) * scale} ${x + (-49.10) * scale} ${y + (-38.00) * scale} ${x + (-48.00) * scale} ${y + (-38.00) * scale}H${x + (-40.00) * scale}C${x + (-38.90) * scale} ${y + (-38.00) * scale} ${x + (-38.00) * scale} ${y + (-38.90) * scale} ${x + (-38.00) * scale} ${y + (-40.00) * scale}V${y + (-48.00) * scale}C${x + (-38.00) * scale} ${y + (-49.10) * scale} ${x + (-38.90) * scale} ${y + (-50.00) * scale} ${x + (-40.00) * scale} ${y + (-50.00) * scale}H${x + (-48.00) * scale}Z" fill="${color}"/>`;
  }
}

export function registerMarathonShapes() {
  shapeRegistry.register([singleDot, quadDots])
}
