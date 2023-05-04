import Styles from "./Forgot.module.scss";
import { Container } from "components/common";
import { ValidationSchemaForgot } from "components/common/header/auth/ValidationSchema";
import { FormikValues, useFormik } from "formik";
import { ForgotData } from "components/common/header/auth/AuthFieldData";
import { Input } from "components/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "components/button";
import { dataProvider } from "service/dataProvider";
import { SnackBar } from "components/snack_bar";
import { CloseIcon, SuccessIcon } from "components/icons";
import { ISnackBar } from "components/snack_bar/SnackBar";

const ForgotContainer = () => {
  const [requestForgot, setRequestForgot] = useState<ISnackBar>({
    show: false,
    message: "",
    theme: "success",
    Icon: SuccessIcon
  });

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
      email: ""
    },
    validationSchema: ValidationSchemaForgot(),
    onSubmit: (value) => {
      dataProvider.getOne("users/forgot", { id: value.email }).then(data => {
        console.log("111", data);
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
          {ForgotData && ForgotData?.map((e, i) => {
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

          <div className={Styles.button_size}><Button theme={"auth"} color={"auth"}
                                                      type={"submit"}>Восстановить</Button>

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

export { ForgotContainer };