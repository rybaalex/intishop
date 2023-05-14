import Styles from "./Auth.module.scss";
import { ChangeEvent, FC, useRef, useState } from "react";
import { Input } from "components/input";
import { Button } from "components/button";
import { FormikValues, useFormik } from "formik";
import { ValidationSchemaSingIn, ValidationSchemaSingUp } from "components/common/header/auth/ValidationSchema";
import { Checkbox } from "components/checkbox";
import { SingInData, SingUpData } from "components/common/header/auth/AuthFieldData";
import { Register } from "service/auth/register";
import { Link } from "components/link";
import { authProvider } from "service/authProvider";
import { IToken } from "types/Token";


interface IAuthForm {
  singInSuccess: (data: IToken) => void;
  singUpSuccess: () => void;
  forgot: () => void;
}

const AuthForm: FC<IAuthForm> = ({ singInSuccess, singUpSuccess, forgot }) => {
  const refContainer = useRef<HTMLInputElement>();
  const [requestSingInError, setRequestSingInError] = useState<string>(undefined);
  const [requestSingUpError, setRequestSingUpError] = useState<string>(undefined);
  const formikSingIn: FormikValues = useFormik({
    initialValues: {
      email: "",
      password: "",
      forgot: false
    },
    validationSchema: ValidationSchemaSingIn(),
    onSubmit: (value) => {
      authProvider.login(value).then(data => {
        if (data.hasError) {
          setRequestSingInError(data.errorMessage);
        } else {
          setRequestSingInError(undefined);
          singInSuccess(data);
        }
      })
        .catch(err => {
          setRequestSingInError(err.message);
        });
    }
  });

  const formikSingUp: FormikValues = useFormik({
    initialValues: {
      nameSingUp: "",
      emailSingUp: "",
      passwordSingUp: "",
      confirmPasswordSingUp: ""
    },
    validationSchema: ValidationSchemaSingUp(),
    onSubmit: (value) => {
      const convertData = {
        email: value.emailSingUp,
        password: value.passwordSingUp,
        name: value.nameSingUp
      };
      Register(convertData).then(() => {
          setRequestSingUpError(undefined);
          singUpSuccess();
        }
      ).catch(err => {
        setRequestSingUpError(err.response.data.message);
      });
    }
  });

  const handleOnClickSignUp = () => {
    refContainer.current.classList.add(`${Styles.right_panel_active}`);
  };
  const handleOnClickSignIn = () => {
    refContainer.current.classList.remove(`${Styles.right_panel_active}`);
  };
  const handleOnClickForgot = () => {
    setTimeout(() => {
        forgot();
      }, 100
    );
  };
  const handleFilterOnChangeSingIn = (
    formik: FormikValues,
    e: ChangeEvent<HTMLInputElement>,
    filter: RegExp,
    field: string,
    size = 0
  ) => {
    const target = e.target.value.replace(filter, "");
    formik.setFieldValue(
      field,
      size > 0
        ? target.length > size
          ? target.substring(0, size)
          : target
        : target
    );
  };
  return <div className={`${Styles.container}`} ref={refContainer}>
    <div className={`${Styles.form_container} ${Styles.sign_up_container}`}>
      <form onSubmit={formikSingUp.handleSubmit}>
        <h1>Регистрация</h1>
        {SingUpData && SingUpData?.map((e, i) => {
          return (<div key={i}
                       className={`${Styles.rowItem} ${formikSingUp.errors[e.name] && formikSingUp.touched[e.name] ? Styles.input_error : ""}`}>
              <Input name={e.name}
                     type={e.type}
                     placeholder=" "
                     label={e.title}
                     onBlur={formikSingUp.handleBlur}
                     onChange={(event) => {
                       handleFilterOnChangeSingIn(formikSingUp, event, e.filter, e.name);
                     }}
                     value={formikSingUp.values[e.name]}
                     iconLabel={<e.icon />}
              />
              <div className={`${Styles.overflow}`}>
            <span
              className={`${formikSingUp.errors[e.name] && formikSingUp.touched[e.name] ? Styles.span_visible : ""}`}>{formikSingUp.errors[e.name]}</span>
              </div>
            </div>
          );
        })}
        <button type={"submit"}>Регистрация</button>
        <div className={`${Styles.all_error} ${requestSingUpError && Styles.visible}`}>{requestSingUpError}</div>
      </form>
    </div>
    <div className={`${Styles.form_container} ${Styles.sign_in_container}`}>
      <form onSubmit={formikSingIn.handleSubmit}>
        <h1>Авторизация</h1>
        {SingInData && SingInData?.map((e, i) => {
          return (<div key={i}
                       className={`${Styles.rowItem} ${formikSingIn.errors[e.name] && formikSingIn.touched[e.name] ? Styles.input_error : ""}`}>
              <Input name={e.name}
                     type={e.type}
                     placeholder=" "
                     label={e.title}
                     onBlur={formikSingIn.handleBlur}
                     onChange={(event) => {
                       handleFilterOnChangeSingIn(formikSingIn, event, e.filter, e.name);
                     }}
                     value={formikSingIn.values[e.name]}
                     iconLabel={<e.icon />}
              />
              <div className={`${Styles.overflow}`}>
            <span
              className={`${formikSingIn.errors[e.name] && formikSingIn.touched[e.name] ? Styles.span_visible : ""}`}>{formikSingIn.errors[e.name]}</span>
              </div>
            </div>
          );
        })}
        <div className={Styles.forgot}>
          <Link url={"/auth/forgot"} onClick={() => handleOnClickForgot()}>Забыли пароль?</Link>
          <Checkbox
            name={"forgot"}
            id={"forgot"}
            title={"Запомнить меня"}
            onChangeData={(d) => {
              formikSingIn.setFieldValue("forgot", !d);
            }}
          />
        </div>
        <div className={Styles.maxSize}>
          <Button type={"submit"}>Вход</Button>
        </div>
        <div className={`${Styles.all_error} ${requestSingInError && Styles.visible}`}>{requestSingInError}</div>
      </form>
    </div>
    <div className={Styles.overlay_container}>
      <div className={Styles.overlay}>
        <div className={`${Styles.overlay_panel} ${Styles.overlay_left}`}>
          <h1>С возвращением!</h1>
          <p>Пожалуйста, войдите в систему, указав свои личные данные</p>
          <button className={Styles.ghost} onClick={() => handleOnClickSignIn()}>Вход</button>
        </div>
        <div className={`${Styles.overlay_panel} ${Styles.overlay_right}`}>
          <h1>Привет!!!</h1>
          <p>Зарегистрируйся, что бы пользоваться возможностями личного кабинета</p>
          <button className={Styles.ghost} onClick={() => {
            handleOnClickSignUp();
          }}>Регистрация
          </button>
        </div>
      </div>
    </div>
  </div>;
};

export { AuthForm };