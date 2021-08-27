export class Player {
        // private userName: any;
        private Name: any;
        private Commander: string;
        private loggedin: boolean
        private Poison: number;
        private Life: number;
        private commanderImg: string;
        constructor(Name: any, Commander: string, commanderImg: string, Life: number, logged: any) {
          this.Poison = 0;
          this.Name = Name;
          this.loggedin = logged;
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
