const _ = require('lodash');
var os = require('os');
var TreeModel = require('tree-model');
var treeify = require('treeify');


const solve = (data) => {
  data = data.split(os.EOL);

  var tree = new TreeModel();
  var root;

  var reprocess = [];
  var prevReprocess = 0;

  for (let i = 0; i < data.length; i++) {
    let line =  data[i].split(')');
    if(line.length > 1) {
      console.log(line[1] + " orbits " + line[0]);

      if(i == 0) {
        root = tree.parse({id: line[0], children: [{id: line[1]}]});
      } else {
        //if the ndoe exists
        var nodeFound = root.first(function (node) {
          return node.model.id === line[0];
        });
        if(nodeFound) {
          var newNode = tree.parse({id: line[1]});
          nodeFound.addChild(newNode);
          console.log()
        } else {
          console.log("parent node not found with id: " + line[0] + ' pushing to reprocess pile');
          console.log("working on item: " + i + " with a reprocess size of: " + reprocess.length);
          reprocess.push(data[i]);
        }
      }

    }

    if(i == data.length - 1) {
      console.log('we are at then end of the road, let\'s reprocess the lines not affected');
      data = reprocess;
      reprocess = [];
      i = 0;

      if(prevReprocess == data.length) {
        console.log('there are abandoned nodes so breaking');
        break;
      }
      prevReprocess = data.length;
      console.log('nodes that have no parents: ' + data.length + '\n\n\n');
    }
  }

  let directIndirectCounter = 0;

  //this only works if single indirect paths since it does a pre breadth first search
  root.walk({strategy: 'breadth'}, function (node) {
    if(node.isRoot()) {
      console.log('root node, no routes');
    } else {
      console.log("calculating orbits for: " + node.model.id + " as " + eval(node.getPath().length-1));
      directIndirectCounter += node.getPath().length-1;
    }
  });

  console.log(directIndirectCounter);


  console.log(
      treeify.asTree(root.model, true, true)
  );

};

module.exports = { solve };
