import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class Talk extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Action,
        "对话", "对话"
    );

    @B3Dec.ArgDec("对话内容", B3ArgType.String)
    content: string;

    run(node: BehaviorNode, env: Environment): BehaviorRet {
        if (env["G_sessionCache"] == undefined) env["G_sessionCache"] = {};
        let isExecuted = env["G_sessionCache"][node.id] != undefined;
        if (isExecuted) {
            if (node.children.length > 0) {
                let child = node.children[0];
                return child.run(env);
            } else {
                return BehaviorRet.Success;
            }
        } else {
            // const config = env["config"] as INPCElement;
            // UIService.getUI(UINpcDialog).show(config.id, this.content.split("|"));
            env["G_sessionCache"][node.id] = true;
            return BehaviorRet.Success;
        }
    }

}