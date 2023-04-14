import { EmailIcon, PassIcon, UserIcon } from "components/icons";
import React from "react";

interface ISignInData {
  name?: string,
  title?: string,
  filter?: RegExp,
  size?: number,
  type?: string,
  icon?: React.SFC<React.SVGProps<SVGSVGElement>>
}

const SingInData: ISignInData[] = [{
  name: "email",
  type: "text",
  title: "Е-майл",
  filter: /\/./g,
  icon: EmailIcon,
  size: 0
},
  {
    name: "password",
    type: "password",
    title: "Пароль",
    filter: /\/./g,
    size: 20,
    icon: PassIcon

  }
];
const SingUpData: ISignInData[] = [
  {
    name: "nameSingUp",
    type: "text",
    title: "Ваше имя",
    filter: /\/./g,
    icon: UserIcon,
    size: 0
  },
  {
    name: "emailSingUp",
    type: "text",
    title: "Е-майл",
    filter: /\/./g,
    icon: EmailIcon,
    size: 0
  },
  {
    name: "passwordSingUp",
    type: "password",
    title: "Пароль",
    filter: /\/./g,
    size: 20,
    icon: PassIcon
  },
  {
    name: "confirmPasswordSingUp",
    type: "password",
    title: "Подтверждение пароля",
    filter: /\/./g,
    size: 20,
    icon: PassIcon
  }
];
export { SingInData, SingUpData };
export type { ISignInData };
