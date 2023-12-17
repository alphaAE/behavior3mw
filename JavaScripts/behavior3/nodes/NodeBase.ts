import { BehaviorRet, BehaviorType } from "../BehaviorDefine";
import { BehaviorNode } from "../BehaviorNode";
import { Environment } from "../BehaviorTree";

export abstract class NodeBase {

    name: string;
    type: BehaviorType;
    desc: string;
    doc: string;

    input: any;
    output: any;

    abstract run(node: BehaviorNode, env: Environment): BehaviorRet;

}