import { BehaviorType, BehaviorRet } from "../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../behavior3/BehaviorNode";
import { Environment } from "../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../behavior3/nodes/NodeBase";

@regBehaviorNode()
class TalkChoices extends NodeBase {

    define: B3Define = new B3Define(
        BehaviorType.Composite,
        "对话选择", "对话选择"
    );

    @B3Dec.ArgDec("内容", B3ArgType.String)
    content: string;

    @B3Dec.ArgDec("选项", B3ArgType.String)
    options: string;

    run(node: BehaviorNode, env: Environment): BehaviorRet {
        if (env["G_sessionCache"] == undefined) env["G_sessionCache"] = {};
        let lastIndex: number = env["G_sessionCache"][node.id];
        if (lastIndex != undefined) {
            let child = node.children[lastIndex];
            return child.run(env);
        } else {
            // const handleSelect = (index: number) => {
            //     env["G_sessionCache"][node.id] = index;
            // }
            // const config = env["config"] as INPCElement;
            // UIService.getUI(UINpcDialog).show(config.id, this.content.split("|"), this.options.split("|"), handleSelect);
            return BehaviorRet.Success;
        }
    }

}