import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3ArgType, B3Dec, B3Define, NodeBase } from "../NodeBase";

@regBehaviorNode()
class Log extends NodeBase {

    public define = new B3Define(
        BehaviorType.Action,
        "打印log",
        "打印log"
    )

    @B3Dec.ArgDec("值", B3ArgType.String)
    public str: string;

    run(node: BehaviorNode, env: Environment): BehaviorRet {
        console.log(this.str);
        return BehaviorRet.Success;
    }

}