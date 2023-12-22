import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Dec, B3Define, NodeBase } from "../NodeBase";

@regBehaviorNode()
class SetNumber extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "设置数值类型",
        "向环境中设置数值类型的值")
        .addOutput("value")

    @B3Dec.ArgDec("设置的值", B3ArgType.Number)
    public val: number;

    run(node: BehaviorNode, env: Environment): [BehaviorRet, number] {
        return [BehaviorRet.Success, this.val];
    }

}