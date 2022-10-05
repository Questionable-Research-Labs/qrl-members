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

  const qLogo = document.querySelector("img[q-logo]");

  if (qLogo) {
    qChangeClass(qLogo, "large", "main");
  }

  const qSlide = document.querySelector("*[q-slide]");

  if (qSlide) {
    qChangeClass(qSlide, "main", "main");
  }

  document.dispatchEvent(new QChangeEvent("main"));
};
