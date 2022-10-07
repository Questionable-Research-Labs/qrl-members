import { signInGuest, undoSignIn } from "./db";
import { addEventListener, QChange, QNotification } from "./event";

const qChangeClass = (element: Element, className: string, name: string) => {
  addEventListener("change", (event) => {
    if (event.qName == name) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  });
};

const qGuestSubmit = (guestName: HTMLInputElement) => async (event: Event) => {
  event.preventDefault();
  const name = guestName.value;
  const result = await signInGuest(name);

  if (typeof result == "string") {
    new QNotification(`Error signing in ${result}`).dispatch();
    return;
  }

  const undoAction = async () => {
    const undoResult = await undoSignIn(result);

    if (typeof undoResult == "string") {
      new QNotification(`Cound not undo sign in ${undoResult}`, {
        text: "Try again",
        action: undoAction,
      }).dispatch();
    }

    new QNotification(`Successfully remove sign in for ${name}!`).dispatch();
  };

  new QNotification(`${name} has signed in as a guest!`, {
    action: undoAction,
    text: "Undo",
  }).dispatch();

  new QChange("main").dispatch();
};

export const startApp = () => {
  document.querySelectorAll("div[q-name]").forEach((elm) => {
    qChangeClass(elm, "shown", elm.getAttribute("q-name") ?? "");
  });

  document.querySelectorAll("button[q-name]").forEach((elm) => {
    const elmName = elm.getAttribute("q-name") as string;

    elm.addEventListener("click", () => {
      new QChange(elmName).dispatch();
    });
  });

  const guestSubmitButton = document.querySelector(
    'button[q-submit="guest"]'
  ) as HTMLButtonElement;
  const guestSubmitForm = document.querySelector(
    'form[q-submit="guest"]'
  ) as HTMLFormElement;
  const guestName = document.querySelector(
    "input[q-guest-name]"
  ) as HTMLInputElement;

  guestSubmitButton.addEventListener("click", qGuestSubmit(guestName));
  guestSubmitForm.addEventListener("submit", qGuestSubmit(guestName));

  new QChange("main").dispatch();
};
