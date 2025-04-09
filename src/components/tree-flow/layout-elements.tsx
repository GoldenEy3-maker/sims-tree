import { Edge, Node, Position } from "@xyflow/react";
import { layoutFromMap } from "entitree-flex";
import { Settings } from "entitree-flex/dist/Settings";

const nodeWidth = 120;
const nodeHeight = 120;

const entitreeSettings: Partial<Settings> = {
  clone: true, // returns a copy of the input, if your application does not allow editing the original object
  enableFlex: true, // has slightly better performance if turned off (node.width, node.height will not be read)
  firstDegreeSpacing: 100, // spacing in px between nodes belonging to the same source, e.g. children with same parent
  nextAfterAccessor: "spouses", // the side node prop used to go sideways, AFTER the current node
  nextAfterSpacing: 100, // the spacing of the "side" nodes AFTER the current node
  nextBeforeAccessor: "siblings", // the side node prop used to go sideways, BEFORE the current node
  nextBeforeSpacing: 100, // the spacing of the "side" nodes BEFORE the current node
  nodeHeight, // default node height in px
  nodeWidth, // default node width in px
  orientation: "vertical", // "vertical" to see parents top and children bottom, "horizontal" to see parents left and
  rootX: 0, // set root position if other than 0
  rootY: 0, // set root position if other than 0
  secondDegreeSpacing: 100, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
  sourcesAccessor: "parents", // the prop used as the array of ancestors ids
  sourceTargetSpacing: 100, // the "vertical" spacing between nodes in vertical orientation, horizontal otherwise
  targetsAccessor: "children", // the prop used as the array of children ids
};

const { Top, Bottom, Left, Right } = Position;

export const layoutElements = (
  tree: Record<string | number, unknown>,
  rootId: number | string,
) => {
  const { nodes: entitreeNodes, rels: entitreeEdges } = layoutFromMap(
    rootId,
    tree,
    entitreeSettings,
  );

  const nodes: Node[] = [],
    edges: Edge[] = [];

  entitreeEdges.forEach((edge) => {
    const sourceNode = edge.source.id;
    const targetNode = edge.target.id;

    const newEdge: Edge = {};

    newEdge.id = "e" + sourceNode + targetNode;
    newEdge.source = sourceNode;
    newEdge.target = targetNode;
    newEdge.type = "custom-edge";
    // newEdge.animated = "true";

    // Check if target node is spouse or sibling
    const isTargetSpouse = !!edge.target.isSpouse;
    const isTargetSibling = !!edge.target.isSibling;

    if (isTargetSpouse) {
      newEdge.sourceHandle = Right;
      newEdge.targetHandle = Left;
    } else if (isTargetSibling) {
      newEdge.sourceHandle = Left;
      newEdge.targetHandle = Right;
    } else {
      newEdge.sourceHandle = Bottom;
      newEdge.targetHandle = Top;
    }

    edges.push(newEdge);
  });

  entitreeNodes.forEach((node) => {
    const newNode: Node = {};

    const isSpouse = !!node?.isSpouse;
    const isSibling = !!node?.isSibling;
    const isRoot = node?.id === rootId;

    if (isSpouse) {
      newNode.sourcePosition = Right;
      newNode.targetPosition = Left;
    } else if (isSibling) {
      newNode.sourcePosition = Left;
      newNode.targetPosition = Right;
    } else {
      newNode.sourcePosition = Bottom;
      newNode.targetPosition = Top;
    }

    newNode.data = { label: node.name, isRoot, ...node };
    newNode.id = node.id;
    newNode.type = "custom-node";

    newNode.width = nodeWidth;
    newNode.height = nodeHeight;

    newNode.position = {
      x: node.x,
      y: node.y,
    };

    nodes.push(newNode);
  });

  return { nodes, edges };
};
