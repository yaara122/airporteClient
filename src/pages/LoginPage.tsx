import { useRef, useState } from "react";
import { userLogin } from "../api/api";
import classes from './forms.module.css'
import Card from "../components/UI/Card";

const validationFormInitial: {
  nameIsValid: boolean;
  passwordIsValid: boolean;
} = { nameIsValid: true, passwordIsValid: true };

const LoginPage: React.FC<{}> = () => {

  const formRef = useRef<HTMLFormElement>(null);
  const userNameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [formValidation, setFormValidation] = useState<{
    nameIsValid: boolean;
    passwordIsValid: boolean;
  }>(validationFormInitial);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormValidation(validationFormInitial);

    if (userNameInput.current?.value.trim() === "") {
      setFormValidation((prevValidation) => {
        return { ...prevValidation, nameIsValid: false };
      });
    }
    if (passwordInput.current?.value.trim() === "") {
      setFormValidation((prevValidation) => {
        return { ...prevValidation, passwordIsValid: false };
      });
    }

    const data = {
      userName: userNameInput.current?.value,
      password: passwordInput.current?.value,
    };

    const serverrespones = await userLogin(data);
    console.log(serverrespones);
    if(formRef.current){
        formRef.current.reset();
        // setFormValidation(validationFormInitial);
    }
    //navigate to users requests page
  };

  return (
    <Card classNames={classes.form}>
      <form onSubmit={submitHandler} ref={formRef} >
        <h1>Log In</h1>
        <label htmlFor="userName">Please enter ur user name</label>
        <input name="userName" type="text" ref={userNameInput}></input>
        {!formValidation?.nameIsValid && <p>User name can not be empty</p>}
        <label htmlFor="email">Please enter ure password</label>
        <input name="email" type="text" ref={passwordInput}></input>
        {!formValidation?.passwordIsValid && <p>Password can not be empty</p>}

        <button type="submit">submit</button>
      </form>
    </Card>
  );
};

export default LoginPage;
