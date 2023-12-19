
import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, NodeBase } from "../NodeBase";
//TODO:验证
@regBehaviorNode()
export class ParallelNode extends NodeBase {
    name = 'Parallel';
    type = BehaviorType.Composite;
    desc = '并行执行';
    doc = `执行所有子节点并返回成功`;

    public run(node: BehaviorNode, env: any, arr: any[]) {
        const [lastIdx, lastRet] = node.resume(env);
        let currentIndex = lastIdx || 1;

        if (lastIdx && lastRet === BehaviorRet.Running) {
            return lastRet;
        }

        for (let i = currentIndex; i <= node.children.length; i++) {
            const child = node.children[i];
            const r = child.run(env);
            if (r === BehaviorRet.Running) {
                return node.yield(env, i);
            }
        }
        return BehaviorRet.Success;
    }

}
