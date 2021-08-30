export class Player {
        // private userName: any;
        private Name: any;
        private Commander: string;
        private loggedin: boolean
        private Poison: number;
        private Life: number;
        private commanderImg: string;
        private partner: string | undefined;
        private partnerImg: string | undefined;
        
        constructor(Name: any, Commander: string, commanderImg: string, Life: number, logged: any,  partner?: string, partnerImg?: string) {
          this.Poison = 0;
          this.Name = Name;
          this.loggedin = logged;
          this.Life = Life
          this.Commander = Commander
          this.commanderImg = commanderImg
          this.partner = partner
          this.partnerImg = partnerImg
        }

        subLife(){
          this.Life = this.Life-1;
        }
        addLife(){
          this.Life = this.Life+1;
        }
        
        
}
