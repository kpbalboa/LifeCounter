export class Player {
        private Name: string;
        private Commander: string;
        private Life: number;
        constructor(Name: string, Commander: string, Life: number) {
          this.Name = Name
          this.Life = Life
          this.Commander = Commander
        }

        subLife(){
          this.Life = this.Life-1;
        }
        addLife(){
          this.Life = this.Life+1;
        }
        
        
}
