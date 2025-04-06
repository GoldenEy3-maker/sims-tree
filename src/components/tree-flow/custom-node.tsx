"use client";

import { Handle, NodeProps, Position } from "@xyflow/react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export function CustomNode({ data, isConnectable, selected }: NodeProps) {
  const [value, setValue] = useState("");
  const label = typeof data.label === "string" ? data.label : "Текст";

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <div
      className={cn(
        "bg-background border transition-[box-shadow] border-border rounded-md p-3",
        {
          "ring-ring/50 ring-[2px]": selected,
        }
      )}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex flex-col items-start gap-1">
        <Label htmlFor="text">{label}:</Label>
        <Input
          id="text"
          name="text"
          onChange={onChange}
          value={value}
          className="nodrag"
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}
