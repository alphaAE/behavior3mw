import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";


@regBehaviorNode()
class SetFromConfig extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "读表", "从配置表中读取内容内容"
    ).addOutput("值(any)");

    @B3Dec.ArgDec("键名", B3ArgType.String)
    public key: string;

    run(node: BehaviorNode, env: Environment): [BehaviorRet, any] {
        // 约定配置表在env["config"]中
        let cfg = env["config"];
        return [BehaviorRet.Success, cfg[this.key]];
    }

}