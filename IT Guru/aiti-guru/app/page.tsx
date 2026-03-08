'use client';
import Image from "next/image";
import IconInput from "./components/IconInput/IconInput";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500 font-sans dark:bg-black">
      <main className="flex w-max flex-col items-center justify-between  dark:bg-black sm:items-start">
        <div className="flex flex-col gap-8 items-center p-12 rounded-lg bg-white">
          <div>
            <Image
              src="/assets/Лого.png"
              alt="Лого"
              width="52"
              height="52"
              className="bg-white rounded-full border-white border-4 p-1.5"
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-4xl font-inter">Добро пожаловать!</h1>
            <p className="font-inter font-medium text-lg text-gray-300">Пожалуйста, авторизуйтесь</p>
          </div>
          <form className="flex flex-col items-start" onSubmit={()=>{console.log("Авторизация успешна")}}>
            <div>
              <label htmlFor="User">Логин</label>
                <IconInput
                  type="text"
                  firstIconSrc="/assets/icons/user icon.png"
                  secondIconSrc="/assets/icons/cross.png"
                  id="User"
                  placeholder="test"
                  className="w-96"
                />
            </div>
            <div>
              <label htmlFor="Password">
                <div>
                  Пароль
                </div>
                <IconInput
                  type="password"
                  firstIconSrc="/assets/icons/lock.png"
                  secondIconSrc="/assets/icons/invisble.png"
                  id="Password"
                  placeholder="*************"
                />
              </label>
            </div>
            <div>
              <label htmlFor="ShouldRemember">
                <input type="checkbox" id="ShouldRemember"></input>
                Запомнить данные
              </label>
            </div>
            <button>Войти</button>
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
