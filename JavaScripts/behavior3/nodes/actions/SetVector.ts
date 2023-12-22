import { BehaviorType, BehaviorRet } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../NodeBase";


@regBehaviorNode()
class SetVector extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "设置向量",
        "向环境中设置向量类型的值")
        .addOutput("值")

    @B3Dec.ArgDec("设置的值(Vec)", B3ArgType.String)
    public vecStr: string;

    run(node: BehaviorNode, env: Environment): [BehaviorRet, Vector] {
        const vecSplit = this.vecStr.split(",");
        const val = new Vector(Number(vecSplit[0]), Number(vecSplit[1]), Number(vecSplit[2]));
        return [BehaviorRet.Success, val];
    }

}