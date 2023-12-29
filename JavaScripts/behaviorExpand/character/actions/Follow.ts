import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";
import { CommCharacterUtils } from "../CommCharacterUtils";

@regBehaviorNode()
class Follow extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "走向目标",
        "走向目标",
    ).addInput("目标角色ID")

    public input: string[] = [];

    run(node: BehaviorNode, env: Environment, damageTargetId: number): BehaviorRet {
        const character = env["gameObject"] as Character;

        const target = Player.getPlayer(damageTargetId);
        if (!target) return BehaviorRet.Fail;

        CommCharacterUtils.tickMoveTo(character, target.character.worldTransform.position);
        return BehaviorRet.Success;
    }

}