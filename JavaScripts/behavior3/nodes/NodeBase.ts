import { BehaviorRet, BehaviorType } from "../BehaviorDefine";
import { BehaviorNode } from "../BehaviorNode";
import { Environment } from "../BehaviorTree";

export abstract class NodeBase {
    /** 名字 */
    abstract name: string;
    /** 类型 */
    abstract type: BehaviorType;
    /** 描述 */
    abstract desc: string;
    /** 备注 */
    public doc: string;
    /** 参数 */
    public args: B3Arg[];
    /** 输入值 */
    public input: string[];
    /** 输出值 */
    public output: string[];

    abstract run(node: BehaviorNode, env: Environment, ...params: any[]): any[] | BehaviorRet;
}

export class B3Arg {

    public constructor(
        public name: string = "",
        public type: B3ArgType,
        public desc: string = "描述") {

    }
}

export enum B3ArgType {
    Int = "int",
    IntFan = "int?",
    String = "string",
}
