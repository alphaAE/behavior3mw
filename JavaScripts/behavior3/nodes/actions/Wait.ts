import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, NodeBase } from "../NodeBase";


@regBehaviorNode()
export class WaitNode extends NodeBase {
    public name: string = "Wait";

    public desc: string = "等待";

    public args: B3Arg[] = [new B3Arg("time", B3ArgType.Int, "时间/tick")];

    public type: BehaviorType = BehaviorType.Action;

    public doc: string = "等待一段时间";

    public run(node: BehaviorNode, env: Environment): BehaviorRet {
        const args = node.args;
        const t = node.resume(env)[0];
        if (t) {
            if (TimeUtil.elapsedTime() >= t) {
                console.log('CONTINUE');
                return BehaviorRet.Success;
            } else {
                console.log('WAITING');
                return BehaviorRet.Running;
            }
        }
        console.log('Wait', args["time"]);
        return node.yield(env, TimeUtil.elapsedTime() + args["time"]);
    }
}
