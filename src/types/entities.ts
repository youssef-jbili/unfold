export interface Label {
  id: number;
  name: string;
  color: string;
  textColor: string;
}

export interface CardDisplay {
  transparent: boolean;
}

export interface Issue {
  id: number;
  title: string;
  issueId: number;
  weight?: number | null;
  labels: Label[];
  order: number;
  assignees: number[];
  description: string;
  display?: CardDisplay;
}

export interface UserInfo {
  name: string;
  avatarUrl: string;
}
