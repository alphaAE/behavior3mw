import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, NodeBase } from "../NodeBase";

@regBehaviorNode()
class Log extends NodeBase {
    public name: string = "Log";
    public desc: string = "打印log";
    public doc: string = "打印log";
    public args: B3Arg[] = [new B3Arg("str", B3ArgType.String, "值")];
    public type: BehaviorType = BehaviorType.Action;

    run(node: BehaviorNode, env: Environment): [BehaviorRet] {
        console.log(node.args["str"]);
        return [BehaviorRet.Success];
    }

}