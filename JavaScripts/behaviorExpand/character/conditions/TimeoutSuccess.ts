import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";


@regBehaviorNode()
class TimeoutSuccess extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "延迟放行",
        "被持续执行指的时间后单次返回成功,")

    @B3Dec.ArgDec("时间(秒)", B3ArgType.Number)
    public time: number;

    public run(node: BehaviorNode, env: Environment): BehaviorRet {
        if (!env.getInnerVar(node, "endTime")) env.setInnerVar(node, "endTime", TimeUtil.elapsedTime() + this.time);
        const endTime = env.getInnerVar(node, "endTime")
        const timeInterval = endTime - TimeUtil.elapsedTime();

        if (timeInterval < 0) {
            env.setInnerVar(node, "endTime", TimeUtil.elapsedTime() + this.time);
            // 0.5s的时间差内返回成功，否则认为已被打断重新计时
            if (timeInterval > -0.5) {
                return BehaviorRet.Success;
            }
        }
        return BehaviorRet.Fail;
    }

}
