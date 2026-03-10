'use client';
import Image from "next/image";
import React from "react";
import IconInput from "./components/IconInput/IconInput";
import Link from "next/link";
import { redirect, RedirectType } from 'next/navigation'
import StyledCheckbox from "./components/StyledCheckbox/StyledCheckbox";

export default function Home() {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [shouldRemember, setShouldRemember] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  async function SignIn() {
    let isError = false;
    await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        username: login,
        password: password,
        expiresInMins: 30, // optional, defaults to 60
      })
    })
      .then(res => {
        isError = !res.ok;
        console.log("result", res, res.ok)
        return res.json()
      })
      .then((res) => {
        setError(isError);
        if (isError) {
          console.log("error", error, res.message);
          setErrorMsg(res.message);
          return;
        } else {

          console.log("no error", res);
          setErrorMsg("");
        }
        console.log("redirect");
        redirect('/products', RedirectType.push);
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans dark:bg-black">
      <main className="flex w-max flex-col items-center justify-between p-1.5 rounded-[40px] bg-white  dark:bg-black sm:items-start">
        <div className="login-form-wrappper flex flex-col gap-8 items-center p-12 rounded-[34px]">
          <div>
            <Image
              src="/assets/Лого.png"
              alt="Лого"
              width="52"
              height="52"
              className="logo bg-white rounded-full border-white border-4 p-1.5"
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-4xl font-inter">Добро пожаловать!</h1>
            <p className="font-inter font-medium text-lg text-gray-300">Пожалуйста, авторизуйтесь</p>
          </div>
          <form className="flex flex-col gap-5 items-start" onSubmit={(e) => {
            e.preventDefault();
            SignIn();
          }}>
            <div>
              <label htmlFor="User" className="block mb-1.5">Логин</label>
                <IconInput
                  type="text"
                  firstIconSrc="/assets/icons/user icon.png"
                  secondIconSrc="/assets/icons/cross.png"
                  required={true}
                  id="User"
                  placeholder="test"
                  className="w-96"
                  value={login}
                  onChange={(e) => {
                    setLogin((e.target as HTMLInputElement).value)
                  }}
                />
            </div>
            <div>
              <label htmlFor="Password">
                <div className="mb-1.5">
                  Пароль
                </div>
                <IconInput
                  type="password"
                  firstIconSrc="/assets/icons/lock.png"
                  secondIconSrc="/assets/icons/invisble.png"
                  required={true}
                  id="Password"
                  placeholder="*************"
                  value={password}
                  className="w-96"
                  onChange={e => {
                    setPassword((e.target as HTMLInputElement).value);
                  }}
                />
              </label>
            </div>
            <div>
              <StyledCheckbox
                name="ShouldRemember"
                styles="top-0 h-5.5 w-5.5 rounded border border-gray-400 border-solid"
                onChange={() => {
                  setShouldRemember(!shouldRemember);
                }}
                checked={shouldRemember}
              >
                <div className="ml-10">Запомнить данные</div>
              </StyledCheckbox>
            </div>

            {error && (
              <div className="mt-1.5 text-red-400">{errorMsg}</div>
            )}
            <button className="w-full px-4 py-2 rounded-xl border-blue-600 border-solid border bg-blue-700 text-white cursor-pointer">
              Войти
            </button>
            <div className="line-decorated w-full">или</div>
          </form>
          <div>
            Нет аккаунта?
            {" "}
            <Link href="/" className="font-semibold text-lg text-blue-800 underline underline-offset-2">Создать</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
