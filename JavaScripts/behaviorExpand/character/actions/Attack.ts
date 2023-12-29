import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class Attack extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "攻击目标",
        "攻击目标"
    ).addInput("伤害目标");

    @B3Dec.ArgDec("动画", B3ArgType.String)
    public attackAnimGuid: string;

    @B3Dec.ArgDec("伤害延迟", B3ArgType.Number)
    public damageDelay: number

    @B3Dec.ArgDec("伤害值", B3ArgType.Number)
    public damage: number;

    @B3Dec.ArgDec("攻击持续时间", B3ArgType.Number)
    public damageTime: number

    run(node: BehaviorNode, env: Environment, damageTargetId: number): BehaviorRet {
        const endTime = node.resume(env)[0];
        if (endTime) {
            if (TimeUtil.elapsedTime() >= endTime) {
                return BehaviorRet.Success;
            } else {
                return BehaviorRet.Running;
            }
        }
        const character = env["gameObject"] as Character;

        // anim
        let ani = character.loadAnimation(this.attackAnimGuid);
        ani.play();

        // onHit
        console.log("Hit", character);

        return node.yield(env, TimeUtil.elapsedTime() + this.damageTime / 1000);
    }

}