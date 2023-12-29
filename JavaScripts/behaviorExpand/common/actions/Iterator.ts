import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class Iterator extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "迭代器", "每次返回数组的下一个值"
    ).addInput("数组(any[])").addOutput("值(any)");


    run(node: BehaviorNode, env: Environment, arr: any[]): [BehaviorRet, any] {
        let index = env.getInnerVar(node, "index") || 0;
        if (index >= arr.length) {
            index = 0;
        }
        env.setInnerVar(node, "index", index + 1);
        return [BehaviorRet.Success, arr[index]];
    }

}