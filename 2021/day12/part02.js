import _ from 'lodash'

let pathCount = 0

export const solve = (data) => {
  const graph = { nodes: {}, smallTwice: false }
  data.forEach(line => {
    const edge = line.split('-')
    if (graph.nodes[edge[0]] === undefined) {
      graph.nodes[edge[0]] = { neighbors: [], blocked: false }
    }
    graph.nodes[edge[0]].neighbors.push(edge[1])
    if (graph.nodes[edge[1]] === undefined) {
      graph.nodes[edge[1]] = { neighbors: [], blocked: false }
    }
    graph.nodes[edge[1]].neighbors.push(edge[0])
  })
  findPaths(graph, 'start')
  console.log(pathCount)
}

const findPaths = (graph, nextNode) => {
  // start + blocked = return
  if (nextNode === 'start' && graph.nodes[nextNode].blocked) return
  // lower + blocked + smallTwice = return
  if (graph.nodes[nextNode].blocked && graph.smallTwice) return
  // end = count + return
  if (nextNode === 'end') {
    pathCount++
    return
  }
  if (nextNode.toLowerCase() === nextNode) {
    // start + not-blocked = block + continue
    if (nextNode === 'start') graph.nodes[nextNode].blocked = true
    // lower + not-blocked = block + continue
    else if (!graph.nodes[nextNode].blocked) graph.nodes[nextNode].blocked = true
    // lower + blocked + not-smallTwice = smallTwice + continue
    else graph.smallTwice = true
  }
  graph.nodes[nextNode].neighbors.forEach(neighbor => {
    findPaths(_.cloneDeep(graph), neighbor)
  })
}
