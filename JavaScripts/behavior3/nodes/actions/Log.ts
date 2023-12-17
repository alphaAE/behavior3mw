import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { NodeBase } from "../NodeBase";

@regBehaviorNode("Log", BehaviorType.Action)
class Log extends NodeBase {

    run(node: BehaviorNode, env: Environment): BehaviorRet {
        console.log(node.args["str"]);
        return BehaviorRet.Success;
    }

}