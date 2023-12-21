import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Dec, B3Define, NodeBase } from "../NodeBase";

@regBehaviorNode()
class Cmp extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "比较值", "比较值"
    ).addInput("存在值");

    @B3Dec.ArgDec("比较值", B3ArgType.Number)
    public eq: number

    run(node: BehaviorNode, env: Environment, value: string): [BehaviorRet] {
        if (this.eq == Number(value)) {
            return [BehaviorRet.Success];
        }
        else {
            return [BehaviorRet.Fail];
        }
    }

}