import _ from 'lodash'

export const solve = (data) => {
  console.log(data)
  // Read in all squares as regions of 1
  // Add all regions to a queue
  // While the queue is not empty
    // Take a region from queue
    // Try to combine with each other region (can you shortcut this?)
      // Keep a map of coordinates to region ID
      // That will cut this down from linear to constant time
    // Once you find a single region to combine with
      // Remove that second region from the queue
      // Add the combined region to the queue
  // Calculate costs
    // Area is easy, just size of region
    // Perimeter is harder
      // Start by assuming it is 4 * area
      // For each plot, substract 1 for each border shared w/ another in-region plot
}
