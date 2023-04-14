import * as Yup from "yup";

const ValidationSchemaSingIn = () => {
  return Yup.object({
    email: Yup.string()
      .min(6, "Минимум 6 символов!")
      .max(50, "Максимум 50 символов!")
      .email("Неверный email!")
      .required("Заполните Email!"),
    password: Yup.string()
      .required("Пароль обязателен для заполнения!")
  });
};
const ValidationSchemaSingUp = () => {
  return Yup.object({
    emailSingUp: Yup.string()
      .min(6, "Минимум 6 символов!")
      .max(50, "Максимум 50 символов!")
      .email("Неверный email!")
      .required("Заполните Email!"),
    passwordSingUp: Yup.string()
      .required("Пароль обязателен для заполнения!"),
    confirmPasswordSingUp: Yup.string()
      .oneOf([Yup.ref("passwordSingUp"), null], "Пароли должны совпадать")
      .required("Подтверждение пароля обязательно"),
    nameSingUp: Yup.string()
      .required("Имя обязательно")
  });
};


export { ValidationSchemaSingIn, ValidationSchemaSingUp };
