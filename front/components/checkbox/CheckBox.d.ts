interface ICheckBox {
  title?: string;
  classCheck?: string;
  onChangeData?: (isChecked: boolean) => void;
  onClick?: () => void;
  name: string;
  id?: string;
}

export { ICheckBox };
