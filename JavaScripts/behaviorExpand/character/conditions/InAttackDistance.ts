import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class InAttackDistance extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "攻击范围检测",
        "攻击范围检测"
    ).addInput("伤害目标")

    @B3Dec.ArgDec("攻击范围", B3ArgType.Number)
    public attachDistance: number;

    run(node: BehaviorNode, env: Environment, damageTargetId: number): BehaviorRet {
        const character = env["gameObject"] as Character;

        const target = Player.getPlayer(damageTargetId);
        if (!target) return BehaviorRet.Fail;
        let selfPos = character.worldTransform.position.clone();
        let targetCharPos = target.character.worldTransform.position.clone();
        selfPos.z = 0;
        targetCharPos.z = 0;
        if (Vector.distance(selfPos, targetCharPos) <= this.attachDistance) {
            return BehaviorRet.Success;
        }
        return BehaviorRet.Fail;
    }

}