import { BehaviorType } from "./BehaviorDefine";
import { BehaviorTree, BehaviorTreeInstance, newEnv } from "./BehaviorTree";
import { NodeBase } from "./nodes/NodeBase";

/** 节点实例 */
export const nodeDecorator: Map<string, NodeBase> = new Map<string, NodeBase>();

// let typeMap: Map<BehaviorType, string> = new Map();
// typeMap.set(BehaviorType.Action, "Action");
// typeMap.set(BehaviorType.Composite, "Composite");
// typeMap.set(BehaviorType.Condition, "Condition");
// typeMap.set(BehaviorType.Decorator, "Decorator");

/** 
 * 节点装饰器
 */
export function regBehaviorNode() {
    return function <T extends { new(...args: any[]): NodeBase }>(constructor: T): T {
        const node = new constructor();
        if (nodeDecorator.get(node.name)) {
            console.error("睁大你的眼~节点名字重复了" + node.name + ":" + constructor.name)
            node.name = node.name + "_";
        }
        nodeDecorator.set(node.name, node);
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

if (SystemUtil.isPIE) {
    InputUtil.onKeyDown(Keys.P, () => {
        Event.dispatchToServer("BehaviorTreeManager");
    })

    Event.addClientListener("BehaviorTreeManager", () => {
        console.log("BehaviorTreeManager");

        let res = [];
        nodeDecorator.forEach(e => {
            res.push(e);
        })

        console.log(JSON.stringify(res));
        DataStorage.asyncSetData("_BehaviorTreeManager", res);
    })

}