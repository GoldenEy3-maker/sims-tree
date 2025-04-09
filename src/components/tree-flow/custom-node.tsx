import { Handle, NodeProps, Position } from "@xyflow/react";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

export function CustomNode({ data, isConnectable, selected }: NodeProps) {
  const { isSpouse, isSibling, label } = data;

  function getTargetPosition() {
    if (isSpouse) {
      return Position.Left;
    } else if (isSibling) {
      return Position.Right;
    }
    return Position.Top;
  }

  const isRootNode = data?.isRoot;
  const hasChildren = !!data?.children?.length;
  const hasSiblings = !!data?.siblings?.length;
  const hasSpouses = !!data?.spouses?.length;

  return (
    <TooltipProvider>
      <div className="nodrag flex">
        {hasChildren ? (
          <Handle
            type="source"
            position={Position.Bottom}
            id={Position.Bottom}
          />
        ) : null}
        {hasSpouses ? (
          <Handle type="source" position={Position.Right} id={Position.Right} />
        ) : null}
        {hasSiblings ? (
          <Handle type="source" position={Position.Left} id={Position.Left} />
        ) : null}
        {!isRootNode ? (
          <Handle
            type={"target"}
            position={getTargetPosition()}
            id={getTargetPosition()}
          />
        ) : null}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="relative h-30 w-30 overflow-hidden rounded-full p-0"
            >
              <Image
                src="/sim-1.png"
                alt="Сим"
                fill
                sizes="15vw"
                className="size-full object-cover"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <h4 className="text-base font-bold">Джут Эдисон {label}</h4>
            <dl className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2">
              <div>
                <dt className="text-muted-foreground text-sm">Пол</dt>
                <dd className="text-sm">Женский</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">Возраст</dt>
                <dd className="text-sm">16</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">Статус</dt>
                <dd className="text-sm">Живой</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">Раса</dt>
                <dd className="text-sm">Человек</dd>
              </div>
            </dl>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
