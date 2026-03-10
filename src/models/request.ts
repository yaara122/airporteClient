class requestItem {
  title: string;
  type: string;
  description: string;
  status?: string;
  creatorName?: string;
  examinerName?: string;
  id?: string;

  constructor() {
    this.title = "";
    this.type = "";
    this.description = "";
    this.status = "pending";
    this.creatorName = "";
  }
}

export default requestItem;
