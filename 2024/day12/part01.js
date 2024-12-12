import _ from 'lodash'

const DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]]

class Region {
  constructor(id, plant, plots) {
    this.id = id
    this.plant = plant
    this.plots = plots
  }

  add(plots) {
    this.plots.push(...plots)
  }

  area() {
    return this.plots.length
  }

  perimeter() {
    let dist = 4 * this.area()
    this.plots.forEach(plot => {
      // Borders another plot in the region
      for (const direction of DIRECTIONS) {
        if (this.plots.some(p => p[0] === plot[0] + direction[0] && p[1] === plot[1] + direction[1])) dist--
      }
    })
    return dist
  }
}

class RegionBag {
  constructor() {
    this.bag = {}
  }

  add(region) {
    this.bag[region.id] = region
  }

  isNotEmpty() {
    return Object.keys(this.bag).length > 0
  }

  drawAny() {
    return this.drawById(Object.entries(this.bag)[0][0])
  }

  drawById(id) {
    const region = this.bag[id]
    delete this.bag[id]
    return region
  }
}

export const solve = (data) => {
  // Read in all squares as separate regions
  let regionId = 0
  const regionBag = new RegionBag()
  const regions = {}
  const garden = data.map((line, row) => {
    return line.split('').map((char, col) => {
      const region = new Region(regionId, char, [[row, col]])
      regionBag.add(region)
      regions[regionId] = region
      return { plant: char, region: regionId++ }
    })
  })
  // While the bag is not empty
  while (regionBag.isNotEmpty()) {
    let combined = false
    // Take a region from bag
    const region = regionBag.drawAny()
    // For each plot, check if it borders a plot in a matching region
    for (const plot of region.plots) {
      for (const direction of DIRECTIONS) {
        if (canCombine(garden, region, plot, direction)) {
          combine(garden, regions, regionBag, region, plot, direction)
          combined = true
          break
        }
        if (combined) break
      }
      if (combined) break
    }
  }
  // Calculate costs
  console.log(_.sum(Object.values(regions).map(region => region.area() * region.perimeter())))
}

const canCombine = (garden, region, plot, direction) => {
  // Check bounds
  const newRow = plot[0] + direction[0]
  const newCol = plot[1] + direction[1]
  if (newRow < 0 || newRow >= garden.length) return false
  if (newCol < 0 || newCol >= garden[0].length) return false
  // Check if neighbor is same plant
  const neighbor = garden[newRow][newCol]
  if (neighbor.plant !== region.plant) return false
  // Check if neighbor is already in region
  return neighbor.region !== region.id
}

const combine = (garden, regions, regionBag, region, plot, direction) => {
  // Identify other region
  const neighborPlot = garden[plot[0] + direction[0]][plot[1] + direction[1]]
  // Remove other region from bag
  const neighborRegion = regionBag.drawById(neighborPlot.region)
  // Update garden and regions
  for (const p of neighborRegion.plots) {
    garden[p[0]][p[1]].region = region.id
  }
  delete regions[neighborRegion.id]
  // Add combined region to the bag
  region.add(neighborRegion.plots)
  regionBag.add(region)
}

const printRegions = (regions) => {
  Object.values(regions).forEach(region => {
    console.log('----------')
    const plotStr = region.plots.map(plot => `[${plot[0]},${plot[1]}]`).join(',')
    console.log(`[ID: ${region.id}][Plant: ${region.plant}][Plots: ${plotStr}]`)
  })
}

const printGarden = (garden) => {
  console.log('----------\n')
  garden.forEach(row => {
    console.log(row.map(plot => String(plot.region).padStart(3, '0')).join(' ') + '\n')
  })
}
