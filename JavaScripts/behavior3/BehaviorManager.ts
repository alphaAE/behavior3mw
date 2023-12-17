import { BehaviorType } from "./BehaviorDefine";
import { BehaviorTree, BehaviorTreeInstance, newEnv } from "./BehaviorTree";
import { NodeBase } from "./nodes/NodeBase";

/** 节点实例 */
export const nodeDecorator: Map<string, any> = new Map<string, NodeBase>();

/** 
 * 节点装饰器
 */
export function regBehaviorNode(name: string, type: BehaviorType, desc?: string, doc?: string, input?: any, output?: any) {
    return function <T extends { new(...args: any[]): NodeBase }>(constructor: T): T {
        const node = new constructor();
        node.name = name;
        node.type = type;
        node.desc = desc;
        node.doc = doc;
        node.input = input;
        node.output = output;
        nodeDecorator.set(name, node);
        return constructor;
    }
}

function newTree(name: string, treeData: any): BehaviorTree {
    const tree = new BehaviorTree(name, treeData);
    trees[name] = tree;
    return tree;
}

const trees: { [key: string]: BehaviorTree } = {};

export const BehaviorTreeManager = {
    new(name: string, treeData: any, envParams: any): BehaviorTreeInstance {
        const env = newEnv(envParams);
        const tree = trees[name] || newTree(name, treeData);
        return {
            tree,
            run: () => tree.run(env),
            interrupt: () => tree.interrupt(env),
            is_running: () => env.stack.length > 0,
            set_env: (k, v) => {
                if (k === '') return;
                env[k] = v;
            },
        };
    },
};
