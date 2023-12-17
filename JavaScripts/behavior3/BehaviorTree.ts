import { BehaviorRet } from './BehaviorDefine';
import { BehaviorNode } from './BehaviorNode';

export type InnerVars = { [key: string]: any };
export type Vars = { [key: string]: any };

// 定义环境接口
interface Environment {
    // 内部变量
    innerVars: InnerVars;
    // 变量
    vars: Vars;
    // 行为节点栈
    stack: BehaviorNode[];
    // 上次返回值
    lastRet: any;

    getVar(k: string): any; // 获取变量
    setVar(k: string, v: any): void; // 设置变量
    getInnerVar(node: BehaviorNode, k: string): any; // 获取行为节点的内部变量
    setInnerVar(node: BehaviorNode, k: string, v: any): void; // 设置行为节点的内部变量
    pushStack(node: BehaviorNode): void; // 将行为节点压入栈
    popStack(): BehaviorNode | undefined; // 弹出栈顶的行为节点
}

class BehaviorTree {
    public name: string;
    public tick: number;
    public root: BehaviorNode;

    constructor(name: string, treeData: any) {
        this.name = name;
        this.tick = 0;
        const data = treeData;
        this.root = new BehaviorNode(data.root, this);
    }

    run(env: Environment): void {
        if (env.stack.length > 0) {
            let lastNode = env.stack[env.stack.length - 1];
            while (lastNode) {
                const ret = lastNode.run(env);
                if (ret === BehaviorRet.Running) {
                    break;
                }
                lastNode = env.stack[env.stack.length - 1];
            }
        } else {
            this.root.run(env);
        }
        this.tick++;
    }

    interrupt(env: Environment): void {
        if (env.stack.length > 0) {
            env.innerVars = {};
            env.stack = [];
        }
    }
}

interface BehaviorTreeInstance {
    tree: BehaviorTree;
    run: () => void;
    interrupt: () => void;
    is_running: () => boolean;
    set_env: (k: string, v: any) => void;
}

export function newEnv(params: Vars): Environment {
    const env: Environment = {
        innerVars: {},
        vars: {},
        stack: [],
        lastRet: null,
        getVar(k: string): any {
            return env.vars[k];
        },
        setVar(k: string, v: any): void {
            if (k === '') return;
            this.vars[k] = v;
        },
        getInnerVar(node: BehaviorNode, k: string): any {
            return this.innerVars[`${k}_${node.id}`];
        },
        setInnerVar(node: BehaviorNode, k: string, v: any): void {
            this.innerVars[`${k}_${node.id}`] = v;
        },
        pushStack(node: BehaviorNode): void {
            this.stack.push(node);
        },
        popStack(): BehaviorNode | undefined {
            const node = this.stack.pop();
            return node;
        },
    };

    for (const [k, v] of Object.entries(params)) {
        env[k] = v;
    }

    return env;
}

export { BehaviorTree, BehaviorTreeInstance, Environment };
