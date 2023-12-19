
import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, NodeBase } from "../NodeBase";
//TODO:验证
@regBehaviorNode()
export class NotNode extends NodeBase {
    name = 'Not';
    type = BehaviorType.Decorator;
    desc = '取反';
    doc = `将子节点的返回值取反`;

    public run(node: BehaviorNode, env: Environment, arr: any[]) {
        const yieldVal = node.resume(env)[0];
        let r;
        if (node.resume(env)[0]) {
            r = env["last_ret"];
        } else {
            r = node.children[0].run(env);
        }

        if (r === BehaviorRet.Success) {
            return BehaviorRet.Fail;
        } else if (r === BehaviorRet.Fail) {
            return BehaviorRet.Success;
        } else if (r === BehaviorRet.Running) {
            return node.yield(env);
        }
    }

}
