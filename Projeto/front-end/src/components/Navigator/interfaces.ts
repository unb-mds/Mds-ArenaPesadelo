interface ILink {
  to: string;
  text: string;
}

export interface INavigator {
  title: string;
  links: ILink[];
  active: ILink['text'];
}
