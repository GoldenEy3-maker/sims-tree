"use client";

import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeTypes,
  Node,
  NodeTypes,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { CustomEdge } from "./custom-edge";
import { CustomNode } from "./custom-node";

const initialNodes: Node[] = [
  { id: "a", position: { x: 0, y: 0 }, data: { label: "Node A" } },
  {
    id: "b",
    position: { x: 0, y: 150 },
    type: "custom-node",
    data: { label: "Node B" },
  },
  { id: "c", position: { x: -100, y: 300 }, data: { label: "Node C" } },
  { id: "d", position: { x: 100, y: 300 }, data: { label: "Node D" } },
];

const initialEdges: Edge[] = [
  {
    id: "a->b",
    type: "custom-edge",
    data: { label: "123" },
    source: "a",
    target: "b",
  },
  {
    id: "b->c",
    type: "custom-edge",
    source: "b",
    target: "c",
  },
];

const edgeTypes: EdgeTypes = {
  "custom-edge": CustomEdge,
};

const nodeTypes: NodeTypes = {
  "custom-node": CustomNode,
};

export function TreeFlow() {
  const [nodes, , onNodeChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  function onConnect(connection: Connection) {
    const edge = { ...connection, type: "custom-edge" };
    setEdges((eds) => addEdge(edge, eds));
  }

  return (
    <div className="h-svh">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
