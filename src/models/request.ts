class requestItem {
  title: string;
  type: string;
  description: string;
  status?: string;
  creatorName?: string;
  createdAt?: string;
  examinerName?: string;
  declineReason?: string
  id?: string;

  constructor() {
    this.title = "";
    this.type = "";
    this.description = "";
    this.status = "בהמתנה";
    this.creatorName = "";
  }
}

export default requestItem;
