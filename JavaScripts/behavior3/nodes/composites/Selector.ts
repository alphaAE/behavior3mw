
import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, NodeBase } from "../NodeBase";

@regBehaviorNode()
export class SelectedNode extends NodeBase {
    name = 'Selector';
    type = BehaviorType.Composite;
    desc = '选择执行';
    doc = `
        + 一直往下执行，有子节点返回成功则返回成功，若全部节点返回失败则返回失败
        + 子节点是或 (OR) 的关系
    `;

    public run(node: BehaviorNode, env: any, arr: any[]) {
        const [lastIdx, lastRet] = node.resume(env);
        let currentIndex = lastIdx || 0;

        if (lastIdx) {
            if (lastRet === BehaviorRet.Success || lastRet === BehaviorRet.Running) {
                return lastRet;
            } else if (lastRet === BehaviorRet.Fail) {
                currentIndex++;
            } else {
                throw new Error('wrong ret');
            }
        }

        for (let i = currentIndex; i <= node.children.length; i++) {
            const child = node.children[i];
            const r = child.run(env);
            if (r === BehaviorRet.Running) {
                return node.yield(env, i);
            }
            if (r === BehaviorRet.Success) {
                return r;
            }
        }
        return BehaviorRet.Fail;
    }

}
