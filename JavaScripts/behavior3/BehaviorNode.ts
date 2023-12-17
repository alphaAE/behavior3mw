import { BehaviorRet } from "./BehaviorDefine";
import { nodeDecorator } from "./BehaviorManager";
import { BehaviorTree, Environment } from "./BehaviorTree";

export class BehaviorNode {
    public tree: BehaviorTree;
    public name: string;
    public id: string;
    public info: string;
    public data: any;
    public args: any[];
    public children: BehaviorNode[];

    constructor(nodeData: any, tree: BehaviorTree) {
        this.tree = tree;
        this.name = nodeData.name;
        this.id = nodeData.id;
        this.info = `node ${tree.name}.${this.id} ${this.name}`;

        this.data = nodeData;
        this.args = this.data.args || [];
        this.children = [];
        for (const childData of nodeData.children || []) {
            const child = new BehaviorNode(childData, tree);
            this.children.push(child);
        }
    }

    run(env: Environment): any {
        if (env.getInnerVar(this, "YIELD") == null) {
            env.pushStack(this);
        }

        const vars: any[] = [];
        for (let i = 0; i < (this.data.input || []).length; i++) {
            vars[i] = env.getVar(this.data.input[i]);
        }

        const func = nodeDecorator.get(this.name).run;
        if (this.data.input) {
            vars.push(func(this, env, ...vars.slice(0, this.data.input.length)));
        } else {
            vars.push(func(this, env, ...vars));
        }

        const ret = vars[0];
        if (!ret) {
            throw new Error(this.info);
        }

        if (ret !== BehaviorRet.Running) {
            env.setInnerVar(this, "YIELD", null);
            env.popStack();
        } else if (env.getInnerVar(this, "YIELD") == null) {
            env.setInnerVar(this, "YIELD", true);
        }

        for (let i = 0; i < (this.data.output || []).length; i++) {
            env.setVar(this.data.output[i], vars[i + 1]);
        }

        env.lastRet = ret;

        if (this.data.debug) {
            let varStr = '';
            for (const [k, v] of Object.entries(env.vars)) {
                varStr += `[${k}]=${v},`;
            }
            console.log(
                `[DEBUG] btree:${this.tree.name}, node:${this.id}, ret:${ret} vars:{${varStr}}`
            );
        }

        return ret;
    }

    yield(env: any, arg?: any): any {
        env.setInnerVar(this, "YIELD", arg || true);
        return BehaviorRet.Running;
    }

    resume(env: any): [any, BehaviorRet] {
        return [env.getInnerVar(this, "YIELD"), env.lastRet];
    }
}
