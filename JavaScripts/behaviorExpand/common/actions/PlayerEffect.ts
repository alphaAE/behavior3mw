import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class PlayerEffect extends NodeBase {

    public define = new B3Define(
        BehaviorType.Action,
        "播放特效",
        "播放特效"
    ).addInput("播放位置");

    @B3Dec.ArgDec("特效GUID", B3ArgType.String)
    public guid: string;

    run(node: BehaviorNode, env: Environment, pos: Vector): BehaviorRet {
        EffectService.playAtPosition(this.guid, pos);
        return BehaviorRet.Success;
    }

}