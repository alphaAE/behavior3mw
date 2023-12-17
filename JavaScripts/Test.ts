import { BehaviorTreeManager } from './behavior3/BehaviorManager';
import { BehaviorTreeInstance } from './behavior3/BehaviorTree';
import { testTreeData } from './testTreeData';

@Component
export default class Test extends Script {

    treeInstance: BehaviorTreeInstance;

    protected onStart(): void {
        this.treeInstance = BehaviorTreeManager.new("hero", testTreeData, {});
        InputUtil.onKeyDown(Keys.T, () => {
            this.treeInstance.run();
        })
    }

    protected onUpdate(dt: number): void {

    }


}