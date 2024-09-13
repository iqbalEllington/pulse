import { getURL } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";

function sharebuttons(props) {
  const [copied, setCopied] = useState(false);
  const [title, setTitle] = useState(false);
  const [url, setUrl] = useState(false);

  const copyURL = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  useEffect(() => {
    setTitle(document.title);
    setUrl(window.location.href);
  });
  const getURL = () => {
    return "";
  };
  return (
    <>
      <ul
        className={
          props.showShare == true ? "sharebuttons active" : "sharebuttons pb-4"
        }
      >
        <li onClick={() => copyURL()}>
          <i className="fa-solid fa-clone" title="Copy Link"></i>
        </li>
        <li>
          <a
            title="Share to Whatsapp"
            target="_blank"
            href={"https://api.whatsapp.com/send?text=" +title+ " " + url}
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </li>
        <li>
          <a
            title="Share to Facebook"
            target="_blank"
            href={"https://www.facebook.com/sharer.php?u=" + url}
          >
            <i className="fa-brands fa-facebook-f" />
          </a>
        </li>
        <li>
          <a
            title="Share to Twitter"
            target="_blank"
            href={"https://twitter.com/share?url=" + url}
          >
            <i className="fa-brands fa-twitter" />
          </a>
        </li>
        <li>
          <a
            title="Share to Linked In"
            target="_blank"
            href={"https://www.linkedin.com/shareArticle?url=" + url}
          >
            <i className="fa-brands fa-linkedin-in" />
          </a>
        </li>
        <span
          className={
            copied == true
              ? "col-12 copied-alert active"
              : "col-12 copied-alert"
          }
        >
          Copied!
        </span>
      </ul>
    </>
  );
}
export default sharebuttons;
