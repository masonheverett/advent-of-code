import _ from 'lodash'

let pathCount = 0

export const solve = (data) => {
  const graph = {}
  data.forEach(line => {
    const edge = line.split('-')
    if (graph[edge[0]] === undefined) {
      graph[edge[0]] = { neighbors: [], blocked: false }
    }
    graph[edge[0]].neighbors.push(edge[1])
    if (graph[edge[1]] === undefined) {
      graph[edge[1]] = { neighbors: [], blocked: false }
    }
    graph[edge[1]].neighbors.push(edge[0])
  })
  findPaths(graph, 'start')
  console.log(pathCount)
}

const findPaths = (graph, nextNode) => {
  if (graph[nextNode].blocked) return
  if (nextNode === 'end') {
    pathCount++
    return
  }
  if (nextNode.toLowerCase() === nextNode) graph[nextNode].blocked = true
  graph[nextNode].neighbors.forEach(neighbor => {
    findPaths(_.cloneDeep(graph), neighbor)
  })
}
