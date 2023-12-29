import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";


@regBehaviorNode()
class IsNearPos extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "在目标点附近", "- 检测当前对象位置是否在目标点指定范围内\n- 有输入值目标点时优先使用，否则使用属性中的目标点"
    ).addInput("目标点(Vec)");

    @B3Dec.ArgDec("范围", B3ArgType.Number)
    public range: number = 10;

    @B3Dec.ArgDec("忽略Z轴", B3ArgType.Number)
    public ignoreZ: number = 0;

    private _curPos: Vector = new Vector();
    private _inPos: Vector = new Vector();

    run(node: BehaviorNode, env: Environment, inPos: Vector): [BehaviorRet] {
        if (!inPos) return [BehaviorRet.Fail]
        let go = env["gameObject"] as GameObject;
        if (!go) return [BehaviorRet.Fail];

        if (this.ignoreZ) {
            this._curPos.x = go.worldTransform.position.x;
            this._curPos.y = go.worldTransform.position.y;
            this._inPos.x = inPos.x;
            this._inPos.y = inPos.y;
            if (Vector.distance(this._curPos, this._inPos) > this.range) {
                return [BehaviorRet.Fail];
            }
        } else {
            if (Vector.distance(go.worldTransform.position, inPos) > this.range) {
                return [BehaviorRet.Fail];
            }
        }
        return [BehaviorRet.Success];
    }

}