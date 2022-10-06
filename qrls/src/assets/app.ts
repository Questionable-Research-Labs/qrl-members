import { signInGuest, undoSignIn } from "./db";

export type QNotificationAction = {
  action: (() => Promise<void>) | (() => void);
  text: string;
};

export class QNotification extends Event {
  constructor(public text: string, public action?: QNotificationAction) {
    super("q-notification", {
      bubbles: false,
      cancelable: false,
      composed: false,
    });
  }
}

class QChangeEvent extends Event {
  public name: string;

  constructor(name: string) {
    super("q-change", {
      bubbles: false,
      cancelable: false,
      composed: false,
    });

    this.name = name;
  }
}

const qChangeClass = (element: Element, className: string, name: string) => {
  document.addEventListener("q-change", (event) => {
    if ((event as QChangeEvent).name == name) {
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
    document.dispatchEvent(new QNotification(`Error signing in ${result}`));
    return;
  }

  const undoAction = async () => {
    const undoResult = await undoSignIn(result);

    if (typeof undoResult == "string") {
      document.dispatchEvent(
        new QNotification(`Cound not undo sign in ${undoResult}`, {
          text: "Try again",
          action: undoAction,
        })
      );
    }

    document.dispatchEvent(
      new QNotification(`Successfully remove sign in for ${name}`)
    );
  };

  document.dispatchEvent(
    new QNotification(`Sign in as guest ${name}`, {
      action: undoAction,
      text: "Undo",
    })
  );
};

export const startApp = () => {
  document.querySelectorAll("div[q-name]").forEach((elm) => {
    qChangeClass(elm, "shown", elm.getAttribute("q-name") ?? "");
  });

  document.querySelectorAll("button[q-name]").forEach((elm) => {
    const elmName = elm.getAttribute("q-name");

    if (elmName) {
      elm.addEventListener("click", () => {
        document.dispatchEvent(new QChangeEvent(elmName));
      });
    }
  });

  const qSlide = document.querySelector("*[q-slide]");

  if (qSlide) {
    qChangeClass(qSlide, "main", "main");
  }

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

  document.dispatchEvent(new QChangeEvent("guest"));
};
