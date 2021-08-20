export class Player {
        private Name: string;
        private Commander: string;
        private Poison: number;
        private Life: number;
        private commanderImg: string;
        constructor(Name: string, Commander: string, commanderImg: string, Life: number) {
          this.Poison = 0;
          this.Name = Name
          this.Life = Life
          this.Commander = Commander
          this.commanderImg = commanderImg
        }

        subLife(){
          this.Life = this.Life-1;
        }
        addLife(){
          this.Life = this.Life+1;
        }
        
        
}
