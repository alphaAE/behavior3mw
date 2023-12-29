import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";
import { CommCharacterUtils } from "../CommCharacterUtils";


@regBehaviorNode()
class MoveTo extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "移动",
        "移动到目标点"
    ).addInput("目标点(Vec)")

    run(node: BehaviorNode, env: Environment, toPos: Vector): BehaviorRet {
        const character = env["gameObject"] as Character;
        let selfPos = character.worldTransform.position.clone();
        let curPosZero = selfPos.clone()
        let toPosZero = toPos.clone()
        curPosZero.z = 0;
        toPosZero.z = 0;
        CommCharacterUtils.tickMoveTo(character, toPos);
        return BehaviorRet.Success;
    }


}