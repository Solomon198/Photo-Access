export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  userId: string;
}

export interface AppBar {
  Menu: {
    Login: string;
    SignUp: string;
    About: string;
    Contact: string;
  };
  AppName: string;
}

export interface ShowcaseSection {
  Caption: string;
  buttonText: string;
}

export interface Features {
  Caption: string;
  Description: string;
}

export interface AppFeatureSection {
  Title: {
    Caption: string;
    SubCaption: string;
  };
  Features: Features[];
}

export interface SocialSection {
  Title: string;
}

export interface FooterSection {
  CopyRight: string;
  Others: {
    Terms: string;
    Privacy: string;
    Faq: string;
  };
}

export interface HomeUI {
  AppBar: AppBar;

  ShowCaseSection: ShowcaseSection;

  AppFeatureSection: AppFeatureSection;

  SocialSection: SocialSection;

  FooterSection: FooterSection;
}
