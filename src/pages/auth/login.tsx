import React from "react";
import { AlertNotification, TitleApp } from "../../components";
import { EmailIcon, LockIcon, LogoSpinnerIcon } from "../../components/icons";
import { InputAuth } from "./components/input-auth";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../core/api/api";
import { LoginRequest } from "../../core/entities/request.entities";
import { BEARER_TOKEN, USER_TOKEN } from "../../core/entities/contant";
import Cookies from "js-cookie";
import { isEmpty, isNil, omit } from "lodash";
import { Spinner } from "@material-tailwind/react";
import { User } from "../../core/entities/user";
import { AlertType } from "../../components/alert-notification";

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<{
    message: string | null;
    type: AlertType | null;
    color: any;
  }>();

  const { mutate, isPending } = useMutation({
    mutationFn: (login: LoginRequest) => {
      setOpen(true);
      return loginUser(login);
    },
    async onSuccess(res) {
      if (res.status === 200) {
        const data = await res.json();
        const user = data as User;
        const token = data.token.token as string;
        Cookies.set(BEARER_TOKEN, token, { path: "/" });
        Cookies.set(USER_TOKEN, JSON.stringify(omit(user, "password")), {
          path: "/",
        });
        setMessages({
          message: data.message,
          type: "success",
          color: "green",
        });
        window.location.href = "/dashboard/admin";
      } else {
        setOpen(true);
        setMessages({
          message: "Echec de connexion verifier vos identifiants",
          type: "danger",
          color: "red",
        });
      }
    },
    onError(error) {
      setMessages({
        message: error.message,
        type: "danger",
        color: "red",
      });
    },
  });

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setMessages({ message: null, type: null, color: "" });
      setOpen(false);
      mutate({
        email,
        password,
      });
    },
    [mutate, password, email]
  );

  const message = !isEmpty(messages?.message) ? messages?.message! : "";

  return (
    <div className="flex h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-all-background bg-cover bg-no-repeat">
      <div className="relative flex flex-row justify-center items-center sm:mx-auto sm:w-full sm:max-w-md">
        {!isPending ? (
          <AlertNotification
            open={open}
            handleOpen={() => setOpen(!open)}
            content={message}
            color={messages ? messages!.color : "white"}
            type={messages ? messages?.type! : "info"}
            className="py-2 w-96 absolute -top-32"
          >
            <></>
          </AlertNotification>
        ) : (
          <></>
        )}
        <TitleApp size="2xl" />
      </div>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white px-6 py-12 sm:rounded-2xl sm:px-12">
          <h1 className="font-semibold text-2xl ">Connectez-vous</h1>
          <span className="text-sm font-extralight">
            Entrez vos identifiants pour vous connecter
          </span>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div>
              <InputAuth
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                disabled={isPending}
                required={true}
                icon={<EmailIcon className="absolute top-[6px] left-2" />}
              />
            </div>

            <div>
              <InputAuth
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                disabled={isPending}
                required={true}
                icon={<LockIcon className="absolute top-[6px] left-2" />}
              />
            </div>

            <div>
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Spinner className="h-6 w-6" color="green" />
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full justify-center items-center rounded-lg bg-primary-100 px-3 h-11 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-100/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Valider
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
