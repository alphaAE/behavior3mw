import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";


@regBehaviorNode()
class RandomPosFromEnv extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "范围位置随机", "范围内获取随机位置，范围和中心点从环境中获取`randomPos.center`与`randomPos.range`"
    ).addOutput("位置(Vec)");

    run(node: BehaviorNode, env: Environment): [BehaviorRet, Vector] {
        let randomPosCenter = env["randomPos"]["center"] as Vector;
        let randomPosRange = env["randomPos"]["range"] as number;
        const pos = new Vector(randomPosCenter.x + MathUtil.randomInt(-randomPosRange, randomPosRange),
            randomPosCenter.y + MathUtil.randomInt(-randomPosRange, randomPosRange), randomPosCenter.z + 100);
        return [BehaviorRet.Success, pos];
    }

}