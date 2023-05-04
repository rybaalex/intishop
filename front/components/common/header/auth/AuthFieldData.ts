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
const ForgotData: ISignInData[] = [{
  name: "email",
  type: "text",
  title: "Е-майл",
  filter: /\/./g,
  icon: EmailIcon,
  size: 0
}];
const ResetData: ISignInData[] = [{
  name: "password",
  type: "password",
  title: "Пароль",
  filter: /\/./g,
  icon: PassIcon,
  size: 0
}, {
  name: "confirmPassword",
  type: "password",
  title: "Повторение пароля",
  filter: /\/./g,
  icon: PassIcon,
  size: 0
}];

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
export { SingInData, SingUpData, ForgotData, ResetData };
export type { ISignInData };
