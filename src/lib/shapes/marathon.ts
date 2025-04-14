import type { ShapeDefinition } from '@/types/index'
import { shapeRegistry } from './registry'

const concentric: ShapeDefinition = {
  id: 'concentric',
  name: 'Concentric',
  category: 'marathon',
  render(x, y, size, color) {
    const scale = size / 100
    return `<path fill-rule="evenodd" clip-rule="evenodd" d="M${x + 38.0 * scale} ${y + 0.0 * scale}C${x + 38.0 * scale} ${y + 20.99 * scale} ${x + 20.99 * scale} ${y + 38.0 * scale} ${x + 0.0 * scale} ${y + 38.0 * scale}C${x + -20.99 * scale} ${y + 38.0 * scale} ${x + -38.0 * scale} ${y + 20.99 * scale} ${x + -38.0 * scale} ${y + 0.0 * scale}C${x + -38.0 * scale} ${y + -20.99 * scale} ${x + -20.99 * scale} ${y + -38.0 * scale} ${x + 0.0 * scale} ${y + -38.0 * scale}C${x + 20.99 * scale} ${y + -38.0 * scale} ${x + 38.0 * scale} ${y + -20.99 * scale} ${x + 38.0 * scale} ${y + 0.0 * scale}ZM${x + 50.0 * scale} ${y + 0.0 * scale}C${x + 50.0 * scale} ${y + 27.61 * scale} ${x + 27.61 * scale} ${y + 50.0 * scale} ${x + 0.0 * scale} ${y + 50.0 * scale}C${x + -27.61 * scale} ${y + 50.0 * scale} ${x + -50.0 * scale} ${y + 27.61 * scale} ${x + -50.0 * scale} ${y + 0.0 * scale}C${x + -50.0 * scale} ${y + -27.61 * scale} ${x + -27.61 * scale} ${y + -50.0 * scale} ${x + 0.0 * scale} ${y + -50.0 * scale}C${x + 27.61 * scale} ${y + -50.0 * scale} ${x + 50.0 * scale} ${y + -27.61 * scale} ${x + 50.0 * scale} ${y + 0.0 * scale}ZM${x + 15.0 * scale} ${y + 0.0 * scale}C${x + 15.0 * scale} ${y + 8.28 * scale} ${x + 8.28 * scale} ${y + 15.0 * scale} ${x + 0.0 * scale} ${y + 15.0 * scale}C${x + -8.28 * scale} ${y + 15.0 * scale} ${x + -15.0 * scale} ${y + 8.28 * scale} ${x + -15.0 * scale} ${y + 0.0 * scale}C${x + -15.0 * scale} ${y + -8.28 * scale} ${x + -8.28 * scale} ${y + -15.0 * scale} ${x + 0.0 * scale} ${y + -15.0 * scale}C${x + 8.28 * scale} ${y + -15.0 * scale} ${x + 15.0 * scale} ${y + -8.28 * scale} ${x + 15.0 * scale} ${y + 0.0 * scale}ZM${x + 27.0 * scale} ${y + 0.0 * scale}C${x + 27.0 * scale} ${y + 14.91 * scale} ${x + 14.91 * scale} ${y + 27.0 * scale} ${x + 0.0 * scale} ${y + 27.0 * scale}C${x + -14.91 * scale} ${y + 27.0 * scale} ${x + -27.0 * scale} ${y + 14.91 * scale} ${x + -27.0 * scale} ${y + 0.0 * scale}C${x + -27.0 * scale} ${y + -14.91 * scale} ${x + -14.91 * scale} ${y + -27.0 * scale} ${x + 0.0 * scale} ${y + -27.0 * scale}C${x + 14.91 * scale} ${y + -27.0 * scale} ${x + 27.0 * scale} ${y + -14.91 * scale} ${x + 27.0 * scale} ${y + 0.0 * scale}Z" fill="${color}"/>`
  }
}

const concentricDot: ShapeDefinition = {
  id: 'concentricDot',
  name: 'Concentric Dot',
  category: 'marathon',
  render(x, y, size, color) {
    const scale = size / 100
    return `<path fill-rule="evenodd" clip-rule="evenodd" d="M${x + 38.0 * scale} ${y + 0.0 * scale}C${x + 38.0 * scale} ${y + 20.99 * scale} ${x + 20.99 * scale} ${y + 38.0 * scale} ${x + 0.0 * scale} ${y + 38.0 * scale}C${x + -20.99 * scale} ${y + 38.0 * scale} ${x + -38.0 * scale} ${y + 20.99 * scale} ${x + -38.0 * scale} ${y + 0.0 * scale}C${x + -38.0 * scale} ${y + -20.99 * scale} ${x + -20.99 * scale} ${y + -38.0 * scale} ${x + 0.0 * scale} ${y + -38.0 * scale}C${x + 20.99 * scale} ${y + -38.0 * scale} ${x + 38.0 * scale} ${y + -20.99 * scale} ${x + 38.0 * scale} ${y + 0.0 * scale}ZM${x + 50.0 * scale} ${y + 0.0 * scale}C${x + 50.0 * scale} ${y + 27.61 * scale} ${x + 27.61 * scale} ${y + 50.0 * scale} ${x + 0.0 * scale} ${y + 50.0 * scale}C${x + -27.61 * scale} ${y + 50.0 * scale} ${x + -50.0 * scale} ${y + 27.61 * scale} ${x + -50.0 * scale} ${y + 0.0 * scale}C${x + -50.0 * scale} ${y + -27.61 * scale} ${x + -27.61 * scale} ${y + -50.0 * scale} ${x + 0.0 * scale} ${y + -50.0 * scale}C${x + 27.61 * scale} ${y + -50.0 * scale} ${x + 50.0 * scale} ${y + -27.61 * scale} ${x + 50.0 * scale} ${y + 0.0 * scale}ZM${x + 0.0 * scale} ${y + 15.0 * scale}C${x + 8.28 * scale} ${y + 15.0 * scale} ${x + 15.0 * scale} ${y + 8.28 * scale} ${x + 15.0 * scale} ${y + 0.0 * scale}C${x + 15.0 * scale} ${y + -8.28 * scale} ${x + 8.28 * scale} ${y + -15.0 * scale} ${x + 0.0 * scale} ${y + -15.0 * scale}C${x + -8.28 * scale} ${y + -15.0 * scale} ${x + -15.0 * scale} ${y + -8.28 * scale} ${x + -15.0 * scale} ${y + 0.0 * scale}C${x + -15.0 * scale} ${y + 8.28 * scale} ${x + -8.28 * scale} ${y + 15.0 * scale} ${x + 0.0 * scale} ${y + 15.0 * scale}Z" fill="${color}"/>`
  }
}

const flower: ShapeDefinition = {
  id: 'flower',
  name: 'Flower',
  category: 'marathon',
  render(x, y, size, color) {
    const scale = size / 100
    return `<path fill-rule="evenodd" clip-rule="evenodd" d="M${x + -42.0 * scale} ${y + -34.0 * scale}C${x + -42.0 * scale} ${y + -38.42 * scale} ${x + -38.42 * scale} ${y + -42.0 * scale} ${x + -34.0 * scale} ${y + -42.0 * scale}H${x + -14.0 * scale}C${x + -9.58 * scale} ${y + -42.0 * scale} ${x + -6.0 * scale} ${y + -38.42 * scale} ${x + -6.0 * scale} ${y + -34.0 * scale}V${y + -16.0 * scale}C${x + -6.0 * scale} ${y + -12.69 * scale} ${x + -3.31 * scale} ${y + -10.0 * scale} ${x + 0.0 * scale} ${y + -10.0 * scale}V${y + -10.0 * scale}C${x + 3.31 * scale} ${y + -10.0 * scale} ${x + 6.0 * scale} ${y + -12.69 * scale} ${x + 6.0 * scale} ${y + -16.0 * scale}V${y + -34.0 * scale}C${x + 6.0 * scale} ${y + -38.42 * scale} ${x + 9.58 * scale} ${y + -42.0 * scale} ${x + 14.0 * scale} ${y + -42.0 * scale}H${x + 34.0 * scale}C${x + 38.42 * scale} ${y + -42.0 * scale} ${x + 42.0 * scale} ${y + -38.42 * scale} ${x + 42.0 * scale} ${y + -34.0 * scale}V${y + -14.0 * scale}C${x + 42.0 * scale} ${y + -9.58 * scale} ${x + 38.42 * scale} ${y + -6.0 * scale} ${x + 34.0 * scale} ${y + -6.0 * scale}H${x + 16.0 * scale}C${x + 12.69 * scale} ${y + -6.0 * scale} ${x + 10.0 * scale} ${y + -3.31 * scale} ${x + 10.0 * scale} ${y + 0.0 * scale}V${y + 0.0 * scale}C${x + 10.0 * scale} ${y + 3.31 * scale} ${x + 12.69 * scale} ${y + 6.0 * scale} ${x + 16.0 * scale} ${y + 6.0 * scale}H${x + 34.0 * scale}C${x + 38.42 * scale} ${y + 6.0 * scale} ${x + 42.0 * scale} ${y + 9.58 * scale} ${x + 42.0 * scale} ${y + 14.0 * scale}V${y + 34.0 * scale}C${x + 42.0 * scale} ${y + 38.42 * scale} ${x + 38.42 * scale} ${y + 42.0 * scale} ${x + 34.0 * scale} ${y + 42.0 * scale}H${x + 14.0 * scale}C${x + 9.58 * scale} ${y + 42.0 * scale} ${x + 6.0 * scale} ${y + 38.42 * scale} ${x + 6.0 * scale} ${y + 34.0 * scale}V${y + 16.0 * scale}C${x + 6.0 * scale} ${y + 12.69 * scale} ${x + 3.31 * scale} ${y + 10.0 * scale} ${x + 0.0 * scale} ${y + 10.0 * scale}V${y + 10.0 * scale}C${x + -3.31 * scale} ${y + 10.0 * scale} ${x + -6.0 * scale} ${y + 12.69 * scale} ${x + -6.0 * scale} ${y + 16.0 * scale}V${y + 34.0 * scale}C${x + -6.0 * scale} ${y + 38.42 * scale} ${x + -9.58 * scale} ${y + 42.0 * scale} ${x + -14.0 * scale} ${y + 42.0 * scale}H${x + -34.0 * scale}C${x + -38.42 * scale} ${y + 42.0 * scale} ${x + -42.0 * scale} ${y + 38.42 * scale} ${x + -42.0 * scale} ${y + 34.0 * scale}V${y + 14.0 * scale}C${x + -42.0 * scale} ${y + 9.58 * scale} ${x + -38.42 * scale} ${y + 6.0 * scale} ${x + -34.0 * scale} ${y + 6.0 * scale}H${x + -16.0 * scale}C${x + -12.69 * scale} ${y + 6.0 * scale} ${x + -10.0 * scale} ${y + 3.31 * scale} ${x + -10.0 * scale} ${y + 0.0 * scale}V${y + 0.0 * scale}C${x + -10.0 * scale} ${y + -3.31 * scale} ${x + -12.69 * scale} ${y + -6.0 * scale} ${x + -16.0 * scale} ${y + -6.0 * scale}H${x + -34.0 * scale}C${x + -38.42 * scale} ${y + -6.0 * scale} ${x + -42.0 * scale} ${y + -9.58 * scale} ${x + -42.0 * scale} ${y + -14.0 * scale}V${y + -34.0 * scale}Z" fill="${color}"/>`
  }
}

const knockout: ShapeDefinition = {
  id: 'knockout',
  name: 'Knockout',
  category: 'marathon',
  render(x, y, size, color) {
    const scale = size / 100
    return `<path fill-rule="evenodd" clip-rule="evenodd" d="M${x + -46.0 * scale} ${y + -50.0 * scale}C${x + -48.21 * scale} ${y + -50.0 * scale} ${x + -50.0 * scale} ${y + -48.21 * scale} ${x + -50.0 * scale} ${y + -46.0 * scale}V${y + 46.0 * scale}C${x + -50.0 * scale} ${y + 48.21 * scale} ${x + -48.21 * scale} ${y + 50.0 * scale} ${x + -46.0 * scale} ${y + 50.0 * scale}H${x + 46.0 * scale}C${x + 48.21 * scale} ${y + 50.0 * scale} ${x + 50.0 * scale} ${y + 48.21 * scale} ${x + 50.0 * scale} ${y + 46.0 * scale}V${y + -46.0 * scale}C${x + 50.0 * scale} ${y + -48.21 * scale} ${x + 48.21 * scale} ${y + -50.0 * scale} ${x + 46.0 * scale} ${y + -50.0 * scale}H${x + -46.0 * scale}ZM${x + 0.0 * scale} ${y + 31.0 * scale}C${x + 17.12 * scale} ${y + 31.0 * scale} ${x + 31.0 * scale} ${y + 17.12 * scale} ${x + 31.0 * scale} ${y + 0.0 * scale}C${x + 31.0 * scale} ${y + -17.12 * scale} ${x + 17.12 * scale} ${y + -31.0 * scale} ${x + 0.0 * scale} ${y + -31.0 * scale}C${x + -17.12 * scale} ${y + -31.0 * scale} ${x + -31.0 * scale} ${y + -17.12 * scale} ${x + -31.0 * scale} ${y + 0.0 * scale}C${x + -31.0 * scale} ${y + 17.12 * scale} ${x + -17.12 * scale} ${y + 31.0 * scale} ${x + 0.0 * scale} ${y + 31.0 * scale}Z" fill="${color}"/>`
  }
}

const quadDots: ShapeDefinition = {
  id: 'quadDots',
  name: 'Quad Dots',
  category: 'marathon',
  render(x, y, size, color) {
    const scale = size / 100
    return `<path fill-rule="evenodd" clip-rule="evenodd" d="M${x + 40.0 * scale} ${y + -50.0 * scale}C${x + 38.9 * scale} ${y + -50.0 * scale} ${x + 38.0 * scale} ${y + -49.1 * scale} ${x + 38.0 * scale} ${y + -48.0 * scale}V${y + -40.0 * scale}C${x + 38.0 * scale} ${y + -38.9 * scale} ${x + 38.9 * scale} ${y + -38.0 * scale} ${x + 40.0 * scale} ${y + -38.0 * scale}H${x + 48.0 * scale}C${x + 49.1 * scale} ${y + -38.0 * scale} ${x + 50.0 * scale} ${y + -38.9 * scale} ${x + 50.0 * scale} ${y + -40.0 * scale}V${y + -48.0 * scale}C${x + 50.0 * scale} ${y + -49.1 * scale} ${x + 49.1 * scale} ${y + -50.0 * scale} ${x + 48.0 * scale} ${y + -50.0 * scale}H${x + 40.0 * scale}ZM${x + 40.0 * scale} ${y + 38.0 * scale}C${x + 38.9 * scale} ${y + 38.0 * scale} ${x + 38.0 * scale} ${y + 38.9 * scale} ${x + 38.0 * scale} ${y + 40.0 * scale}V${y + 48.0 * scale}C${x + 38.0 * scale} ${y + 49.1 * scale} ${x + 38.9 * scale} ${y + 50.0 * scale} ${x + 40.0 * scale} ${y + 50.0 * scale}H${x + 48.0 * scale}C${x + 49.1 * scale} ${y + 50.0 * scale} ${x + 50.0 * scale} ${y + 49.1 * scale} ${x + 50.0 * scale} ${y + 48.0 * scale}V${y + 40.0 * scale}C${x + 50.0 * scale} ${y + 38.9 * scale} ${x + 49.1 * scale} ${y + 38.0 * scale} ${x + 48.0 * scale} ${y + 38.0 * scale}H${x + 40.0 * scale}ZM${x + -50.0 * scale} ${y + 40.0 * scale}C${x + -50.0 * scale} ${y + 38.9 * scale} ${x + -49.1 * scale} ${y + 38.0 * scale} ${x + -48.0 * scale} ${y + 38.0 * scale}H${x + -40.0 * scale}C${x + -38.9 * scale} ${y + 38.0 * scale} ${x + -38.0 * scale} ${y + 38.9 * scale} ${x + -38.0 * scale} ${y + 40.0 * scale}V${y + 48.0 * scale}C${x + -38.0 * scale} ${y + 49.1 * scale} ${x + -38.9 * scale} ${y + 50.0 * scale} ${x + -40.0 * scale} ${y + 50.0 * scale}H${x + -48.0 * scale}C${x + -49.1 * scale} ${y + 50.0 * scale} ${x + -50.0 * scale} ${y + 49.1 * scale} ${x + -50.0 * scale} ${y + 48.0 * scale}V${y + 40.0 * scale}ZM${x + -48.0 * scale} ${y + -50.0 * scale}C${x + -49.1 * scale} ${y + -50.0 * scale} ${x + -50.0 * scale} ${y + -49.1 * scale} ${x + -50.0 * scale} ${y + -48.0 * scale}V${y + -40.0 * scale}C${x + -50.0 * scale} ${y + -38.9 * scale} ${x + -49.1 * scale} ${y + -38.0 * scale} ${x + -48.0 * scale} ${y + -38.0 * scale}H${x + -40.0 * scale}C${x + -38.9 * scale} ${y + -38.0 * scale} ${x + -38.0 * scale} ${y + -38.9 * scale} ${x + -38.0 * scale} ${y + -40.0 * scale}V${y + -48.0 * scale}C${x + -38.0 * scale} ${y + -49.1 * scale} ${x + -38.9 * scale} ${y + -50.0 * scale} ${x + -40.0 * scale} ${y + -50.0 * scale}H${x + -48.0 * scale}Z" fill="${color}"/>`
  }
}

const singleDot: ShapeDefinition = {
  id: 'singleDot',
  name: 'Single Dot',
  category: 'marathon',
  render(x, y, size, color) {
    const scale = size / 100
    return `<rect x="${x + -6.0 * scale}" y="${y + -6.0 * scale}" width="${12.0 * scale}" height="${12.0 * scale}" rx="2" fill="${color}"/>`
  }
}

export function registerMarathonShapes() {
  shapeRegistry.register([concentric, concentricDot, flower, knockout, quadDots, singleDot])
}
