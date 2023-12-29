import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";


@regBehaviorNode()
class Anim extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "动画播放",
        "动画播放"
    ).addInput("动画(Str)");

    run(node: BehaviorNode, env: Environment, animGuid: string): BehaviorRet {
        if (!animGuid) {
            // console.log("animGuid is null");
            return BehaviorRet.Success;
        }
        const character = env["gameObject"] as Character;

        let ani = character.loadAnimation(animGuid);
        ani.play();

        return BehaviorRet.Success;
    }

}