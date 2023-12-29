import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";


@regBehaviorNode()
class Random extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "随机器", "每次随机重数组里取一个"
    ).addInput("数组(any[])").addOutput("值(any)");

    run(node: BehaviorNode, env: Environment, arr: any[]): [BehaviorRet, any] {
        if (!arr) return [BehaviorRet.Success, null];
        return [BehaviorRet.Success, arr[Math.floor(Math.random() * arr.length)]];
    }

}