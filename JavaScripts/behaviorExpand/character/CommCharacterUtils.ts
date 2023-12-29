export class CommCharacterUtils extends Character {

    public static tickMoveTo(char: Character, pos: Vector): void {
        let dir = new Vector(pos.x, pos.y, 0).subtract(new Vector(char.worldTransform.position.x, char.worldTransform.position.y, 0)).normalize();
        char.worldTransform.rotation = dir.toRotation();
        char.addMovement(Vector.forward);
    }

}
