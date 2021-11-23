import _ from 'lodash'
import TreeModel from 'tree-model'

let firstRun = true

export const solve = (data) => {
  const tree = new TreeModel()
  let root
  let reprocess = []
  let prevReprocess = 0

  for (let i = 0; i < data.length; i++) {
    let line = data[i].split(')')

    if (line.length > 1) {
      if (i === 0 && firstRun === true) {
        root = tree.parse({ id: line[0], children: [{ id: line[1] }] })
        firstRun = false
      } else {
        // if the node exists
        var nodeFound = root.first((node) => {
          return node.model.id === line[0]
        })
        if (nodeFound) {
          nodeFound.addChild(tree.parse({ id: line[1] }))
        } else {
          reprocess.push(data[i])
        }
      }
    }

    if (i === data.length - 1) {
      data = reprocess
      reprocess = []
      i = -1

      if (prevReprocess === data.length) break

      prevReprocess = data.length
    }
  }

  let directIndirectCounter = 0

  // this only works if single indirect paths since it does a pre breadth first search
  root.walk({ strategy: 'post' }, (node) => {
    if (!node.isRoot()) {
      directIndirectCounter += node.getPath().length - 1
    }
  })

  console.log(directIndirectCounter)
}
