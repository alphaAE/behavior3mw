import { BehaviorType, BehaviorRet } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { NodeBase } from "../NodeBase";


@regBehaviorNode()
class Sequence extends NodeBase {
    name: string = "Sequence";
    type: BehaviorType = BehaviorType.Composite;
    desc: string = "顺序执行";
    doc: string = "顺序执行";

    run(node: BehaviorNode, env: Environment): [BehaviorRet] {
        let [lastIdx, lastRet] = node.resume(env);

        if (lastIdx !== undefined) {
            if (lastRet === BehaviorRet.Fail || lastRet === BehaviorRet.Running) {
                return [lastRet];
            } else if (lastRet === BehaviorRet.Success) {
                lastIdx = lastIdx + 1;
            } else {
                throw new Error('wrong ret');
            }
        } else {
            lastIdx = 1;
        }

        for (let i = lastIdx; i <= node.children.length; i++) {
            const child = node.children[i - 1];
            const r = child.run(env);

            if (r === BehaviorRet.Running) {
                return [node.yield(env, i)];
            }

            if (r === BehaviorRet.Fail) {
                console.log("Sequence Fail")
                return [r];
            }
        }

        return [BehaviorRet.Success];
    }

}