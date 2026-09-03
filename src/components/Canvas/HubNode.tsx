import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import './canvas.css';

/** Category drives the glaze on the header square, and nothing else. */
export type NodeKind =
  | 'source' | 'transform' | 'logic' | 'model' | 'storage' | 'note' | 'output' | 'failing';

export type HubNodeData = {
  /** The node's name, at label size. */
  name: string;
  /** One line of the node's real configuration, so the graph reads without opening anything. */
  detail: string;
  kind: NodeKind;
  /** Omit the target handle on a source, the source handle on an output. */
  inputs?: boolean;
  outputs?: boolean;
};

export type HubFlowNode = Node<HubNodeData, 'hub'>;

export function HubNode({ data }: NodeProps<HubFlowNode>) {
  const { name, detail, kind, inputs = true, outputs = true } = data;

  return (
    <div className="hub-node">
      {inputs ? <Handle type="target" position={Position.Left} /> : null}
      <div className="hub-node__head">
        <span className="hub-node__kind" data-kind={kind} aria-hidden="true" />
        <span>{name}</span>
      </div>
      <div className="hub-node__body" title={detail}>{detail}</div>
      {outputs ? <Handle type="source" position={Position.Right} /> : null}
    </div>
  );
}

export const nodeTypes = { hub: HubNode };
