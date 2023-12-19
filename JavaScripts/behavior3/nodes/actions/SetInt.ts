import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, NodeBase } from "../NodeBase";

@regBehaviorNode()
class SetInt extends NodeBase {
    name: string = "SetInt";
    desc: string = "设置整数";
    doc: string = "设置整数";

    public args: B3Arg[] = [new B3Arg("val", B3ArgType.Int, "设置的值")];

    public type: BehaviorType = BehaviorType.Action;

    public output: string[] = ["value"]

    run(node: BehaviorNode, env: Environment): [BehaviorRet, number] {
        return [BehaviorRet.Success, node.args["val"]];
    }

}