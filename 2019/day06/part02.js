import _ from 'lodash'
import os from 'os'
import TreeModel from 'tree-model'

let firstRun = true

export const solve = (data) => {
  data = data.split(os.EOL)

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
        // if the ndoe exists
        let nodeFound = root.first((node) => {
          return node.model.id === line[0]
        })
        if (nodeFound) {
          var newNode = tree.parse({ id: line[1] })
          nodeFound.addChild(newNode)
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

  var youNode = root.first(function (node) {
    return node.model.id === 'YOU'
  })
  var youPath = youNode.getPath()

  console.log("Paths of YOU node\n\n\n")
  for (let j = 0; j < youPath.length; j++) {
    console.log(" " + youPath[j].model.id + ",")
  }

  var sanNode = root.first((node) => {
    return node.model.id === 'SAN'
  })
  var sanPath = sanNode.getPath()

  console.log("Paths of SAN node\n\n\n")
  for (let j = 0; j < sanPath.length; j++) {
    console.log(" " + sanPath[j].model.id + ",")
  }
}
