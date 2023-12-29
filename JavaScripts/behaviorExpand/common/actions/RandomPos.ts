import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class RandomPos extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "范围位置随机", "范围内获取随机位置"
    ).addInput("中心点(Vec)").addOutput("位置(Vec)");

    // @B3Dec.ArgDec("中心点(Vec)", B3ArgType.String)
    // public center: string;

    @B3Dec.ArgDec("范围", B3ArgType.Number)
    public range: number;

    run(node: BehaviorNode, env: Environment, randomPosCenter: Vector): [BehaviorRet, Vector] {
        // const centerSplit = this.center.split(",");
        // const randomPosCenter = new Vector(Number(centerSplit[0]), Number(centerSplit[1]), Number(centerSplit[2]));
        const randomPosRange = this.range;
        const pos = new Vector(randomPosCenter.x + MathUtil.randomInt(-randomPosRange, randomPosRange),
            randomPosCenter.y + MathUtil.randomInt(-randomPosRange, randomPosRange), randomPosCenter.z + 100);
        return [BehaviorRet.Success, pos];
    }

}