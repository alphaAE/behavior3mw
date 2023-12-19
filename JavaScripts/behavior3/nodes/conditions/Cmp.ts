import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, NodeBase } from "../NodeBase";

@regBehaviorNode()
class Cmp extends NodeBase {
    name: string = "Cmp";
    type: BehaviorType = BehaviorType.Condition;
    desc: string = "比较值";
    doc: string = "比较值";

    public input: string[] = ["inputValue"];

    public args: B3Arg[] = [new B3Arg("eq", B3ArgType.Int, "值")];

    run(node: BehaviorNode, env: Environment, value: string): [BehaviorRet] {
        let args = node.args;
        if (args["eq"] == Number(value)) {
            return [BehaviorRet.Success];
        }
        else {
            return [BehaviorRet.Fail];
        }
    }

}