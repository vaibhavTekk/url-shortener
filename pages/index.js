import axios from "axios";
import { useState } from "react";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 7);

export default function Home() {
  function isValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  const [error, setError] = useState({ isError: false, error: "" });
  const [shortLink, setShortLink] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const link = event.target.link.value;
    const host = window.location.protocol + "//" + window.location.host;
    setError({ isError: false, error: "" });
    setShortLink("");
    if (isValidURL(link)) {
      const slug = nanoid();
      await axios({
        method: "POST",
        url: "/api/create",
        data: { link, slug },
      })
        .then((res) => {
          if (!res.data.error) {
            setShortLink(host + "/api/" + res.data.slug);
            console.log(res.data.slug);
          } else {
            setError({ isError: true, error: res.data.error })
          }
        })
        .catch((err) => setError({ isError: true, error: err.message }));
    } else {
      setError({ isError: true, error: "Invalid Link" });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-900 h-screen">
      <p className="text-5xl font-bold m-4">URL Shortener</p>
      <form className="flex flex-row w-1/3 justify-center items-center p-6" action="input" onSubmit={onSubmit}>
        <input className="flex-grow h-full rounded-md mr-4" type="text" id="link" />
        <input className="bg-blue-800 rounded-md px-6 py-2" type="submit" value="Submit" />
      </form>
      {error.isError && <p>{error.error}</p>}
      {shortLink && (
        <div className="flex flex-col justify-center items-center p-4">
          <p className="text-2xl">Your Shortened Link :</p>
          <a className="hover:underline hover:underline-offset-1" href={shortLink} rel="noreferrer" target="_blank">
            {shortLink}
          </a>
        </div>
      )}
    </div>
  );
}
