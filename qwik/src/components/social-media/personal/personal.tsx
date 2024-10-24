import { component$ } from "@builder.io/qwik";
import socialMediaPersonalStyles from "./personal.module.css";
import { BsLinkedin, BsGithub, BsDiscord, BsInstagram, BsFacebook, BsPinterest } from "@qwikest/icons/bootstrap";
import buttonDetails from "../../../data/links.json";

const permittedLinks = {
  /*Define links and icons in the format => "<App name from json>" : <Component> */
  "LinkedIn": BsLinkedin,
  "Github": BsGithub,
  "Discord": BsDiscord,
  "Instagram": BsInstagram,
  "Facebook": BsFacebook,
  "Pinterest": BsPinterest,
};

export default component$(() => {

  return (
    <div class={[socialMediaPersonalStyles.hero]}>
      <div class={socialMediaPersonalStyles["button-group"]}>
        {buttonDetails
          .filter((button) => Object.prototype.hasOwnProperty.call(permittedLinks, button.name))
          .map((button, index) => {
            const IconComponent = permittedLinks[button.name as keyof typeof permittedLinks];
            return (
              <a
                key={index}
                href={button.link}
                class={socialMediaPersonalStyles[button.class]}
                target="_blank"
                onClick$={(e) => {
                  e.preventDefault();
                }}
              >
                <IconComponent />
              </a>
            );
          })}
      </div>
    </div>
  );
});
