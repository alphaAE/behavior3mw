
import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, NodeBase } from "../NodeBase";
//TODO:验证
@regBehaviorNode()
export class AlwaysSuccessNode extends NodeBase {
    name = 'AlwaysSuccess';
    type = BehaviorType.Decorator;
    desc = '始终返回成功';
    doc = `
    + 只能有一个子节点,多个仅执行第一个
    + 不管子节点是否成功都返回成功
    `;

    public run(node: BehaviorNode, env: Environment, arr: any[]) {
        const [yeild, lastRet] = node.resume(env);
        if (yeild) {
            if (lastRet === BehaviorRet.Running) {
                return lastRet;
            }
            return BehaviorRet.Success;
        }

        const r = node.children[0].run(env);
        if (r === BehaviorRet.Running) {
            return node.yield(env);
        }
        return BehaviorRet.Success;
    }

}
