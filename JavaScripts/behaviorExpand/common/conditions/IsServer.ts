import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";


@regBehaviorNode()
class IsServer extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "是否服务端", "是否在服务端执行"
    )

    run(node: BehaviorNode, env: Environment): BehaviorRet {
        return SystemUtil.isServer() ? BehaviorRet.Success : BehaviorRet.Fail;
    }

}