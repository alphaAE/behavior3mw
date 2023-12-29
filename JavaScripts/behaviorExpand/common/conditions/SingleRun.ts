import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class SingleRun extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "单次运行", "该节点只会运行一次，之后永远返回失败"
    )

    run(node: BehaviorNode, env: Environment): BehaviorRet {
        const isRun = env.getInnerVar(node, "isRun");
        if (!isRun) {
            env.setInnerVar(node, "isRun", true);
            return BehaviorRet.Success;
        }
        return BehaviorRet.Fail;
    }

}