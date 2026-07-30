"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type SourceInteractionsProps = {
  bodyClass: string;
};

type FormPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  sourcePath: string;
  company?: string;
};

type LightboxState = {
  images: string[];
  index: number;
};

const IMAGE_LINK = /\.(?:avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i;

function fieldValue(formData: FormData, candidates: string[]) {
  for (const candidate of candidates) {
    const value = formData.get(candidate);
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function payloadFromForm(form: HTMLFormElement): FormPayload {
  const data = new FormData(form);
  const firstName = fieldValue(data, [
    "firstName",
    "form_fields[name]",
    "name",
  ]);
  const lastName = fieldValue(data, [
    "lastName",
    "form_fields[field_44c7fb9]",
  ]);

  return {
    name: [firstName, lastName].filter(Boolean).join(" "),
    email: fieldValue(data, ["email", "form_fields[email]"]),
    phone: fieldValue(data, [
      "phone",
      "form_fields[field_4f00a29]",
    ]),
    service: fieldValue(data, [
      "service",
      "form_fields[field_5a03240]",
    ]),
    message: fieldValue(data, ["message", "form_fields[message]"]),
    sourcePath: window.location.pathname,
    company: fieldValue(data, ["company"]),
  };
}

async function sendForm(
  form: HTMLFormElement,
  payload: FormPayload,
  status: HTMLElement,
) {
  const submit = form.querySelector<HTMLButtonElement | HTMLInputElement>(
    'button[type="submit"], input[type="submit"]',
  );
  const originalLabel =
    submit instanceof HTMLButtonElement
      ? submit.innerHTML
      : submit instanceof HTMLInputElement
        ? submit.value
        : "";

  if (submit) {
    submit.disabled = true;
    if (submit instanceof HTMLButtonElement) {
      submit.textContent = "Sending…";
    } else {
      submit.value = "Sending…";
    }
  }

  status.dataset.visible = "false";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    let result: {
      ok?: boolean;
      message?: string;
      mailto?: string;
    };
    const responseType = response.headers.get("content-type") ?? "";
    if (responseType.includes("application/json")) {
      result = (await response.json()) as typeof result;
    } else {
      const responseText = await response.text();
      result = {
        message:
          responseText.trim() ||
          `The message could not be sent (error ${response.status}).`,
      };
    }

    if (!response.ok) {
      if (result.mailto) {
        window.location.href = result.mailto;
        status.textContent =
          result.message ??
          "Your email app has been opened so you can send the enquiry.";
        status.dataset.state = "success";
        status.dataset.visible = "true";
        return;
      }
      throw new Error(result.message || "The message could not be sent.");
    }

    form.reset();
    status.textContent =
      result.message ?? "Thanks — your message has been sent.";
    status.dataset.state = "success";
    status.dataset.visible = "true";
  } catch (error) {
    status.textContent =
      error instanceof Error
        ? error.message
        : "The message could not be sent. Please call 0413 844 912.";
    status.dataset.state = "error";
    status.dataset.visible = "true";
  } finally {
    if (submit) {
      submit.disabled = false;
      if (submit instanceof HTMLButtonElement) {
        submit.innerHTML = originalLabel;
      } else {
        submit.value = originalLabel;
      }
    }
  }
}

function ensureStatus(form: HTMLFormElement) {
  let status = form.querySelector<HTMLElement>(".esg-form-status");
  if (!status) {
    status = document.createElement("div");
    status.className = "esg-form-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    form.append(status);
  }
  return status;
}

export default function SourceInteractions({
  bodyClass,
}: SourceInteractionsProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const quoteDialogRef = useRef<HTMLDivElement>(null);
  const lightboxDialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const setQuoteVisible = useCallback((open: boolean) => {
    if (open && document.activeElement instanceof HTMLElement) {
      restoreFocusRef.current = document.activeElement;
    }
    setQuoteOpen(open);
    if (!open) {
      window.requestAnimationFrame(() => restoreFocusRef.current?.focus());
    }
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    window.requestAnimationFrame(() => restoreFocusRef.current?.focus());
  }, []);

  useEffect(() => {
    const originalClass = document.body.className;
    document.body.className = `${bodyClass} esg-nextjs-mirror`.trim();

    const sourceRoot = document.querySelector<HTMLElement>(".esg-source-page");
    if (!sourceRoot) {
      return () => {
        document.body.className = originalClass;
      };
    }

    sourceRoot
      .querySelectorAll<HTMLElement>(".e-con.e-parent")
      .forEach((element) => element.classList.add("e-lazyloaded"));

    sourceRoot
      .querySelectorAll<HTMLElement>("[data-src], [data-lazy-src]")
      .forEach((element) => {
        const source = element.dataset.src ?? element.dataset.lazySrc;
        if (source) {
          // WordPress lazy loaders leave a 1×1 GIF in `src`; the data
          // attribute is the authoritative image URL.
          element.setAttribute("src", source);
        }
        element.classList.remove("lazyload", "lazy-loading");
        element.classList.add("lazyloaded");
        element.style.visibility = "";
      });

    sourceRoot
      .querySelectorAll<HTMLElement>(
        "[data-srcset], [data-lazy-srcset]",
      )
      .forEach((element) => {
        const sourceSet =
          element.dataset.srcset ?? element.dataset.lazySrcset;
        if (sourceSet) {
          element.setAttribute("srcset", sourceSet);
        }
      });

    sourceRoot
      .querySelectorAll<HTMLElement>("[data-sizes], [data-lazy-sizes]")
      .forEach((element) => {
        const sizes = element.dataset.sizes ?? element.dataset.lazySizes;
        if (sizes) {
          element.setAttribute("sizes", sizes);
        }
      });

    sourceRoot
      .querySelectorAll<HTMLElement>(
        "[data-bg], [data-background-image], [data-thumbnail]",
      )
      .forEach((element) => {
        const source =
          element.dataset.bg ??
          element.dataset.backgroundImage ??
          element.dataset.thumbnail;
        if (source && !element.style.backgroundImage) {
          element.style.backgroundImage = `url("${source}")`;
        }
      });

    const cleanups: Array<() => void> = [];

    const openQuote = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      const link = event.target.closest<HTMLAnchorElement>(
        'a[href*="elementor-action"], a[href*="popup%3Aopen"]',
      );
      if (!link || !sourceRoot.contains(link)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      setQuoteVisible(true);
    };
    sourceRoot.addEventListener("click", openQuote);
    cleanups.push(() => sourceRoot.removeEventListener("click", openQuote));

    sourceRoot
      .querySelectorAll<HTMLFormElement>("form.elementor-form")
      .forEach((form) => {
        const limits: Array<[string, number]> = [
          ['[name="form_fields[name]"]', 60],
          ['[name="form_fields[field_44c7fb9]"]', 60],
          ['[name="form_fields[email]"]', 254],
          ['[name="form_fields[field_4f00a29]"]', 50],
          ['[name="form_fields[message]"]', 5000],
        ];
        for (const [selector, maxLength] of limits) {
          form
            .querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)
            ?.setAttribute("maxlength", String(maxLength));
        }
        form
          .querySelector<HTMLElement>('[name="form_fields[name]"]')
          ?.setAttribute("required", "");
        form
          .querySelector<HTMLElement>('[name="form_fields[message]"]')
          ?.setAttribute("required", "");

        const handler = (event: Event) => {
          event.preventDefault();
          const status = ensureStatus(form);
          void sendForm(form, payloadFromForm(form), status);
        };
        form.addEventListener("submit", handler);
        cleanups.push(() => form.removeEventListener("submit", handler));
      });

    const menuButton = sourceRoot.querySelector<HTMLElement>(
      "#wprmenu_bar .hamburger",
    );
    const menu = sourceRoot.querySelector<HTMLElement>("#mg-wprm-wrap");
    if (menuButton && menu) {
      const parentItem =
        menu.querySelector<HTMLElement>(".menu-item-has-children");
      const parentLink =
        parentItem?.querySelector<HTMLAnchorElement>(":scope > a");
      const subMenu =
        parentItem?.querySelector<HTMLElement>(":scope > .sub-menu");

      if (parentItem && parentLink && subMenu) {
        parentItem.classList.add("wprmenu_parent_item_li");
        parentLink.classList.add("wprmenu_parent_item");
        subMenu.style.display = "none";

        const submenuToggle = document.createElement("span");
        submenuToggle.className =
          "wprmenu_icon wprmenu_icon_par icon_default";
        submenuToggle.setAttribute("role", "button");
        submenuToggle.setAttribute("tabindex", "0");
        submenuToggle.setAttribute("aria-label", "Toggle Services submenu");
        submenuToggle.setAttribute("aria-expanded", "false");
        parentItem.insertBefore(submenuToggle, parentLink);

        const toggleSubmenu = () => {
          const isOpen = subMenu.style.display !== "none";
          subMenu.style.display = isOpen ? "none" : "block";
          submenuToggle.classList.toggle("wprmenu_par_opened", !isOpen);
          submenuToggle.setAttribute("aria-expanded", String(!isOpen));
        };
        const clickSubmenu = (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleSubmenu();
        };
        const keySubmenu = (event: KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            clickSubmenu(event);
          }
        };
        submenuToggle.addEventListener("click", clickSubmenu);
        submenuToggle.addEventListener("keydown", keySubmenu);
        cleanups.push(() => {
          submenuToggle.removeEventListener("click", clickSubmenu);
          submenuToggle.removeEventListener("keydown", keySubmenu);
          submenuToggle.remove();
          subMenu.style.display = "";
          parentItem.classList.remove("wprmenu_parent_item_li");
          parentLink.classList.remove("wprmenu_parent_item");
        });
      }

      const closeMenu = () => {
        menu.classList.remove("esg-mobile-menu-open");
        menu.classList.remove("cbp-spmenu-open");
        menuButton.classList.remove("is-active");
        menuButton.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("esg-lock-scroll");
      };
      const handler = () => {
        const isOpen = menu.classList.toggle("esg-mobile-menu-open");
        menu.classList.toggle("cbp-spmenu-open", isOpen);
        menuButton.classList.toggle("is-active", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menu.setAttribute("aria-hidden", String(!isOpen));
        document.body.classList.toggle("esg-lock-scroll", isOpen);
      };
      const keyMenu = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handler();
        }
      };
      const escapeMenu = (event: KeyboardEvent) => {
        if (
          event.key === "Escape" &&
          menu.classList.contains("esg-mobile-menu-open")
        ) {
          closeMenu();
          menuButton.focus();
        }
      };
      menu.setAttribute("aria-hidden", "true");
      menuButton.addEventListener("click", handler);
      menuButton.addEventListener("keydown", keyMenu);
      document.addEventListener("keydown", escapeMenu);
      cleanups.push(() => {
        menuButton.removeEventListener("click", handler);
        menuButton.removeEventListener("keydown", keyMenu);
        document.removeEventListener("keydown", escapeMenu);
      });

      menu.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
        cleanups.push(() => link.removeEventListener("click", closeMenu));
      });
    }

    sourceRoot.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
      const href = link.href;
      if (!IMAGE_LINK.test(href)) {
        return;
      }
      const handler = (event: MouseEvent) => {
        event.preventDefault();
        if (document.activeElement instanceof HTMLElement) {
          restoreFocusRef.current = document.activeElement;
        }
        const gallery = link.closest(".elementor-gallery__container");
        const images = gallery
          ? Array.from(
              gallery.querySelectorAll<HTMLAnchorElement>("a[href]"),
            )
              .map((galleryLink) => galleryLink.href)
              .filter((source) => IMAGE_LINK.test(source))
          : [href];
        setLightbox({
          images,
          index: Math.max(0, images.indexOf(href)),
        });
      };
      link.addEventListener("click", handler);
      cleanups.push(() => link.removeEventListener("click", handler));
    });

    sourceRoot
      .querySelectorAll<HTMLElement>(
        ".elementor-widget-n-carousel, .elementor-widget-image-carousel",
      )
      .forEach((widget) => {
        const slides = Array.from(
          widget.querySelectorAll<HTMLElement>(".swiper-slide"),
        );
        if (slides.length < 2) {
          return;
        }

        const wrapper =
          widget.querySelector<HTMLElement>(".swiper-wrapper");
        const swiper = widget.querySelector<HTMLElement>(".swiper");
        if (!wrapper || !swiper) {
          return;
        }

        let settings: Record<string, unknown> = {};
        try {
          settings = JSON.parse(widget.dataset.settings ?? "{}") as Record<
            string,
            unknown
          >;
        } catch {
          settings = {};
        }

        const numberSetting = (key: string, fallback: number) => {
          const raw = settings[key];
          const value =
            typeof raw === "number"
              ? raw
              : typeof raw === "string"
                ? Number.parseFloat(raw)
                : Number.NaN;
          return Number.isFinite(value) && value > 0 ? value : fallback;
        };

        const desktopSlides = numberSetting("slides_to_show", 1);
        const tabletSlides = numberSetting(
          "slides_to_show_tablet",
          desktopSlides,
        );
        const mobileSlides = numberSetting("slides_to_show_mobile", 1);
        const speed = numberSetting("speed", 500);
        const autoplaySpeed = numberSetting("autoplay_speed", 3000);
        const autoplay = settings.autoplay !== "no";
        const pauseOnHover = settings.pause_on_hover !== "no";

        widget.classList.add("esg-carousel-ready");
        widget.style.setProperty("--esg-carousel-speed", `${speed}ms`);

        let activeIndex = 0;
        let slidesVisible = 1;
        let paused = false;

        const calculateVisible = () => {
          if (window.innerWidth <= 767) {
            return mobileSlides;
          }
          if (window.innerWidth <= 1024) {
            return tabletSlides;
          }
          return desktopSlides;
        };

        const render = () => {
          slidesVisible = Math.max(
            1,
            Math.min(slides.length, calculateVisible()),
          );
          const maxIndex = Math.max(0, slides.length - slidesVisible);
          if (activeIndex > maxIndex) {
            activeIndex = 0;
          }
          widget.style.setProperty(
            "--esg-slides-visible",
            String(slidesVisible),
          );
          const wrapperStyle = window.getComputedStyle(wrapper);
          const gap =
            Number.parseFloat(
              wrapperStyle.columnGap || wrapperStyle.gap || "0",
            ) || 0;
          const slideWidth =
            (swiper.clientWidth - gap * (slidesVisible - 1)) / slidesVisible;
          widget.style.setProperty(
            "--esg-slide-width",
            `${Math.max(0, slideWidth)}px`,
          );
          wrapper.style.transform = `translate3d(-${
            activeIndex * (slideWidth + gap)
          }px, 0, 0)`;
          slides.forEach((slide, index) => {
            const visible =
              index >= activeIndex && index < activeIndex + slidesVisible;
            slide.classList.toggle(
              "swiper-slide-active",
              index === activeIndex,
            );
            slide.setAttribute("aria-hidden", String(!visible));
          });
        };

        const move = (direction: 1 | -1) => {
          const maxIndex = Math.max(0, slides.length - slidesVisible);
          activeIndex += direction;
          if (activeIndex > maxIndex) {
            activeIndex = 0;
          } else if (activeIndex < 0) {
            activeIndex = maxIndex;
          }
          render();
        };

        render();

        const resize = () => render();
        window.addEventListener("resize", resize);
        cleanups.push(() => window.removeEventListener("resize", resize));

        let pointerStartX: number | null = null;
        const pointerDown = (event: PointerEvent) => {
          if (event.isPrimary) {
            pointerStartX = event.clientX;
          }
        };
        const pointerUp = (event: PointerEvent) => {
          if (pointerStartX === null || !event.isPrimary) {
            return;
          }
          const distance = pointerStartX - event.clientX;
          pointerStartX = null;
          if (Math.abs(distance) >= 40) {
            paused = true;
            move(distance > 0 ? 1 : -1);
          }
        };
        const pointerCancel = () => {
          pointerStartX = null;
        };
        swiper.addEventListener("pointerdown", pointerDown);
        swiper.addEventListener("pointerup", pointerUp);
        swiper.addEventListener("pointercancel", pointerCancel);
        cleanups.push(() => {
          swiper.removeEventListener("pointerdown", pointerDown);
          swiper.removeEventListener("pointerup", pointerUp);
          swiper.removeEventListener("pointercancel", pointerCancel);
        });

        widget
          .querySelectorAll<HTMLElement>(".elementor-swiper-button-next")
          .forEach((button) => {
            const next = () => {
              paused = true;
              move(1);
            };
            const keyNext = (event: KeyboardEvent) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                next();
              }
            };
            button.setAttribute("role", "button");
            button.setAttribute("tabindex", "0");
            button.setAttribute("aria-label", "Next");
            button.addEventListener("click", next);
            button.addEventListener("keydown", keyNext);
            cleanups.push(() => {
              button.removeEventListener("click", next);
              button.removeEventListener("keydown", keyNext);
            });
          });

        widget
          .querySelectorAll<HTMLElement>(".elementor-swiper-button-prev")
          .forEach((button) => {
            const previous = () => {
              paused = true;
              move(-1);
            };
            const keyPrevious = (event: KeyboardEvent) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                previous();
              }
            };
            button.setAttribute("role", "button");
            button.setAttribute("tabindex", "0");
            button.setAttribute("aria-label", "Previous");
            button.addEventListener("click", previous);
            button.addEventListener("keydown", keyPrevious);
            cleanups.push(() => {
              button.removeEventListener("click", previous);
              button.removeEventListener("keydown", keyPrevious);
            });
          });

        if (pauseOnHover) {
          const pause = () => {
            paused = true;
          };
          const resume = () => {
            paused = false;
          };
          widget.addEventListener("mouseenter", pause);
          widget.addEventListener("mouseleave", resume);
          cleanups.push(() => {
            widget.removeEventListener("mouseenter", pause);
            widget.removeEventListener("mouseleave", resume);
          });
        }

        if (autoplay) {
          const timer = window.setInterval(() => {
            if (!paused) {
              move(1);
            }
          }, autoplaySpeed);
          cleanups.push(() => window.clearInterval(timer));
        }
      });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      document.body.className = originalClass;
      document.body.classList.remove("esg-lock-scroll");
    };
  }, [bodyClass, setQuoteVisible]);

  useEffect(() => {
    const modalActive = quoteOpen || Boolean(lightbox);
    document.body.classList.toggle("esg-lock-scroll", modalActive);

    const activeDialog = quoteOpen
      ? quoteDialogRef.current
      : lightboxDialogRef.current;
    if (activeDialog) {
      window.requestAnimationFrame(() => {
        if (quoteOpen) {
        quoteDialogRef.current
          ?.querySelector<HTMLInputElement>("input")
          ?.focus();
        } else {
          lightboxDialogRef.current
            ?.querySelector<HTMLButtonElement>(".esg-lightbox-close")
            ?.focus();
        }
      });
    }

    const handleDialogKey = (event: KeyboardEvent) => {
      if (!modalActive) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        if (quoteOpen) {
          setQuoteVisible(false);
        } else {
          closeLightbox();
        }
        return;
      }

      if (lightbox && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventDefault();
        setLightbox((current) => {
          if (!current) {
            return null;
          }
          const direction = event.key === "ArrowRight" ? 1 : -1;
          return {
            ...current,
            index:
              (current.index + direction + current.images.length) %
              current.images.length,
          };
        });
        return;
      }

      if (event.key !== "Tab" || !activeDialog) {
        return;
      }

      const focusable = Array.from(
        activeDialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleDialogKey);

    return () => {
      document.removeEventListener("keydown", handleDialogKey);
      document.body.classList.remove("esg-lock-scroll");
    };
  }, [closeLightbox, lightbox, quoteOpen, setQuoteVisible]);

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = ensureStatus(form);
    void sendForm(form, payloadFromForm(form), status);
  };

  return (
    <>
      <div
        className="esg-modal-backdrop"
        hidden={!quoteOpen}
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setQuoteVisible(false);
          }
        }}
      >
        <div
          ref={quoteDialogRef}
          className="esg-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="esg-quote-title"
        >
          <button
            className="esg-modal-close"
            type="button"
            aria-label="Close quote form"
            onClick={() => setQuoteVisible(false)}
          >
            ×
          </button>
          <h2 id="esg-quote-title">Get A Free Quote</h2>
          <form onSubmit={submitQuote}>
            <div className="esg-quote-grid">
              <div className="esg-quote-field">
                <label htmlFor="quote-first-name">First Name</label>
                <input
                  id="quote-first-name"
                  name="firstName"
                  maxLength={60}
                  required
                />
              </div>
              <div className="esg-quote-field">
                <label htmlFor="quote-last-name">Last Name</label>
                <input
                  id="quote-last-name"
                  name="lastName"
                  maxLength={59}
                />
              </div>
              <div className="esg-quote-field">
                <label htmlFor="quote-email">Email</label>
                <input
                  id="quote-email"
                  name="email"
                  type="email"
                  maxLength={254}
                  required
                />
              </div>
              <div className="esg-quote-field">
                <label htmlFor="quote-phone">Phone Number</label>
                <input
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  maxLength={50}
                />
              </div>
              <div className="esg-quote-field esg-quote-field--full">
                <label htmlFor="quote-service">Service Needed</label>
                <select id="quote-service" name="service">
                  <option>Cladding</option>
                  <option>Render</option>
                  <option>Hebel</option>
                  <option>Walling</option>
                </select>
              </div>
              <div className="esg-quote-field esg-quote-field--full">
                <label htmlFor="quote-message">Message</label>
                <textarea
                  id="quote-message"
                  name="message"
                  rows={4}
                  maxLength={5000}
                  required
                />
              </div>
              <div
                className="esg-quote-field esg-quote-field--full"
                aria-hidden="true"
                style={{ position: "absolute", left: "-10000px" }}
              >
                <label htmlFor="quote-company">Company</label>
                <input
                  id="quote-company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  maxLength={120}
                />
              </div>
              <button className="esg-quote-submit" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        ref={lightboxDialogRef}
        className="esg-lightbox"
        hidden={!lightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Project image"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            closeLightbox();
          }
        }}
      >
        <button
          className="esg-lightbox-close"
          type="button"
          aria-label="Close image"
          onClick={closeLightbox}
        >
          ×
        </button>
        {lightbox && lightbox.images.length > 1 ? (
          <>
            <span className="esg-lightbox-counter" aria-live="polite">
              {lightbox.index + 1} / {lightbox.images.length}
            </span>
            <button
              className="esg-lightbox-nav esg-lightbox-prev"
              type="button"
              aria-label="Previous image"
              onClick={() =>
                setLightbox((current) =>
                  current
                    ? {
                        ...current,
                        index:
                          (current.index - 1 + current.images.length) %
                          current.images.length,
                      }
                    : null,
                )
              }
            >
              ‹
            </button>
            <button
              className="esg-lightbox-nav esg-lightbox-next"
              type="button"
              aria-label="Next image"
              onClick={() =>
                setLightbox((current) =>
                  current
                    ? {
                        ...current,
                        index: (current.index + 1) % current.images.length,
                      }
                    : null,
                )
              }
            >
              ›
            </button>
          </>
        ) : null}
        {lightbox ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={lightbox.images[lightbox.index]} alt="" />
        ) : null}
      </div>
    </>
  );
}
