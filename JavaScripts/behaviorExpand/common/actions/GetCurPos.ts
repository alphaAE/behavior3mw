import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class GetCurPos extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "获取当前位置", "获取当前位置"
    ).addOutput("位置(Vec)");

    run(node: BehaviorNode, env: Environment): [BehaviorRet, Vector] {
        let go = env["gameObject"] as GameObject;
        return [BehaviorRet.Success, go.worldTransform.position];
    }

}