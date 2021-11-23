import _ from 'lodash';
import TreeModel from 'tree-model';
import treeify from 'treeify';

var firstRun = true;

export const solve = (data) => {
  var tree = new TreeModel();
  var root;

  var reprocess = [];
  var prevReprocess = 0;

  for (let i = 0; i < data.length; i++) {
    let line =  data[i].split(')');
    if(line.length > 1) {
      console.log(line[1] + " orbits " + line[0]);

      if(i == 0 && firstRun == true) {
        root = tree.parse({id: line[0], children: [{id: line[1]}]});
        firstRun = false;
      } else {
        //if the ndoe exists
        var nodeFound = root.first(function (node) {
          return node.model.id === line[0];
        });
        if(nodeFound) {
          var newNode = tree.parse({id: line[1]});
          nodeFound.addChild(newNode);
          console.log('node found and added as child: ' + line[1] + ' i: ' + i);
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
      i = -1;

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
  root.walk({strategy: 'post'}, function (node) {
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
