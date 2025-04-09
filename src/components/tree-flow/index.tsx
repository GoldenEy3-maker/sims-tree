"use client";

import {
  addEdge,
  Background,
  Connection,
  ConnectionLineType,
  Controls,
  EdgeTypes,
  NodeTypes,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { CustomEdge } from "./custom-edge";
import { CustomNode } from "./custom-node";
import { initialTree, treeRootId } from "./initial-tree";
import { layoutElements } from "./layout-elements";

const edgeTypes: EdgeTypes = {
  "custom-edge": CustomEdge,
};

const nodeTypes: NodeTypes = {
  "custom-node": CustomNode,
};

const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
  initialTree,
  treeRootId,
);

export function TreeFlow() {
  const [nodes, , onNodeChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  function onConnect(connection: Connection) {
    const edge = { ...connection, type: "custom-edge" };
    setEdges((eds) => addEdge(edge, eds));
  }

  return (
    <div className="h-svh">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodeChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineType={ConnectionLineType.SmoothStep}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
