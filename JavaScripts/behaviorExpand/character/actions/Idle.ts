import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class Idle extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "闲置",
        "目标角色闲置"
    )

    run(node: BehaviorNode, env: Environment): BehaviorRet {
        return BehaviorRet.Success;
    }

}