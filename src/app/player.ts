export class Player {
        private Name: string;
        private Life: number;
        constructor(Name: string, Life: number) {
          this.Name = Name
          this.Life = Life
        }

        subLife(){
          this.Life = this.Life-1;
        }
        addLife(){
          this.Life = this.Life+1;
        }
        
        
}
