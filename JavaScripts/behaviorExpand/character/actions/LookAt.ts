import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class LookAt extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "看向目标角色",
        "看向目标角色"
    ).addInput("目标角色ID")

    @B3Dec.ArgDec("仅Z轴", B3ArgType.Number)
    public onlyZ: number = 0;

    private _lookAtPos: Vector = new Vector();

    run(node: BehaviorNode, env: Environment, targetId: number): BehaviorRet {
        const character = env["gameObject"] as Character;

        const target = Player.getPlayer(targetId);
        if (!target) return BehaviorRet.Fail;
        if (this.onlyZ) {
            this._lookAtPos.x = target.character.worldTransform.position.x;
            this._lookAtPos.y = target.character.worldTransform.position.y;
            this._lookAtPos.z = character.worldTransform.position.z;
            character.worldTransform.lookAt(this._lookAtPos);
        } else {
            character.worldTransform.lookAt(target.character.worldTransform.position);
        }
        return BehaviorRet.Success;
    }

}