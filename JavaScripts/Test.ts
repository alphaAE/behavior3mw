import { BehaviorTreeManager } from './behavior3/BehaviorManager';
import { BehaviorTreeInstance } from './behavior3/BehaviorTree';
import { Behavoir3_hero } from './behavior3Data/hero';
import { Behavoir3_testTree } from './behavior3Data/testTree';

@Component
export default class Test extends Script {

    treeInstance: BehaviorTreeInstance;

    protected onStart(): void {
        this.treeInstance = BehaviorTreeManager.new("testTree", Behavoir3_testTree, {
            ctx: {
                time: 5
            }
        });
        InputUtil.onKeyDown(Keys.T, () => {
            this.treeInstance.run();
        })
    }

    protected onUpdate(dt: number): void {

    }


}