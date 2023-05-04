import Styles from "./Reset.module.scss";
import { Container } from "components/common";
import { ValidationSchemaReset } from "components/common/header/auth/ValidationSchema";
import { FormikValues, useFormik } from "formik";
import { ResetData } from "components/common/header/auth/AuthFieldData";
import { Input } from "components/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "components/button";
import { dataProvider } from "service/dataProvider";
import { SnackBar } from "components/snack_bar";
import { CloseIcon, SuccessIcon } from "components/icons";
import { ISnackBar } from "components/snack_bar/SnackBar";
import { useRouter } from "next/dist/client/router";

const ResetContainer = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(5);

  const [requestForgot, setRequestForgot] = useState<ISnackBar>({
    show: false,
    message: "",
    theme: "success",
    Icon: SuccessIcon
  });
  const [successButton, setSuccessButton] = useState(false);

  useEffect(() => {
    counter === 0  && router.push("/");
    let timer: NodeJS.Timeout;
    if (successButton) {
      timer = counter > 0 && setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [counter, successButton]);

  useEffect(() => {
    requestForgot.show && setTimeout(() => {
      setRequestForgot(
        {
          show: false,
          message: requestForgot.message,
          Icon: requestForgot.Icon
        }
      );
    }, 5000);
  }, [requestForgot.show]);

  const formikForgot: FormikValues = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: ""
    },
    validationSchema: ValidationSchemaReset(),
    onSubmit: (value) => {
      dataProvider.update("users/reset", { data: { id: router.query.id, password: value.password } }).then(() => {
        setRequestForgot({
          message: "Пароль изменен",
          show: true,
          theme: "success",
          Icon: SuccessIcon
        });
        setSuccessButton(true);
        //Вам на емайл выслана ссылка для сброса пароля
      }).catch(err => {
        setRequestForgot({
          message: err.message,
          show: true,
          theme: "error",
          Icon: CloseIcon
        });
      });
    }
  });
  const handleFilterOnChangeForgot = (
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

  return (<Container className={"wrapper no_margin width100"}>
    <div className={Styles.forgot_container}>
      <div className={Styles.forgot_form}>
        <form onSubmit={formikForgot.handleSubmit}>
          <h1>Востановление пароля</h1>
          {ResetData && ResetData?.map((e, i) => {
            return (<div key={i}
                         className={`${Styles.rowItem} ${formikForgot.errors[e.name] && formikForgot.touched[e.name] ? Styles.input_error : ""}`}>
                <Input name={e.name}
                       type={e.type}
                       placeholder=" "
                       label={e.title}
                       onBlur={formikForgot.handleBlur}
                       onChange={(event) => {
                         handleFilterOnChangeForgot(formikForgot, event, e.filter, e.name);
                       }}
                       value={formikForgot.values[e.name]}
                       iconLabel={<e.icon />}
                />
                <div className={`${Styles.overflow} `}>
            <span
              className={`${formikForgot.errors[e.name] || formikForgot.touched[e.name] ? Styles.span_visible : ""}`}>{formikForgot.errors[e.name]}</span>
                </div>
              </div>
            );
          })}

          <div className={Styles.button_size}>
            {!successButton ? <Button theme={"auth"} color={"auth"}
                                      type={"submit"}>Сохранить</Button> :
              <Button theme={"auth"} link={"/"} color={"auth"}
                      type={"submit"}>На главную {counter}</Button>}


          </div>
        </form>

      </div>
    </div>

    <SnackBar
      message={requestForgot.message}
      theme={requestForgot.theme}
      show={requestForgot.show}
      position={"topRight"}
      Icon={requestForgot.Icon}
    />
  </Container>);
};

export { ResetContainer };