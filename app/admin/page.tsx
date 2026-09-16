"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const categories = [
  "Lok Sabha",
  "Supreme Court",
  "Memes",
  "Market",
  "Sports",
  "Agriculture",
  "Updates",
  "Latest"
];

export default function Admin() {

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] =
    useState("Latest");

  const [file, setFile] =
    useState<File | null>(null);

  const [message, setMessage] =
    useState("");

  async function publish(
    event: React.FormEvent
  ) {

    event.preventDefault();

    setMessage("Publishing…");

    let image_url = "";

    if (file) {

      const extension =
        file.name.split(".").pop() || "jpg";

      const path =
        `${Date.now()}-${crypto.randomUUID()}.${extension}`;

      const upload =
        await supabase.storage
          .from("article-images")
          .upload(path, file);

      if (upload.error) {

        setMessage(
          upload.error.message
        );

        return;
      }

      image_url =
        supabase.storage
          .from("article-images")
          .getPublicUrl(path)
          .data.publicUrl;
    }

    const { error } =
      await supabase
        .from("articles")
        .insert({

          title,

          excerpt,

          body,

          category,

          image_url,

          status: "published",

          published_at:
            new Date().toISOString()

        });

    if (error) {

      setMessage(error.message);

    } else {

      setMessage(
        "Article published successfully."
      );

      setTitle("");
      setExcerpt("");
      setBody("");
      setFile(null);
    }
  }

  return (

    <main className="container admin">

      <h1 className="serif">
        Newsroom Editor
      </h1>

      <p className="muted">
        Write, add an image and publish
        directly to The Anapa.
      </p>

      <form
        className="form"
        onSubmit={publish}
      >

        <label>
          Headline

          <input
            required
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Write the headline"
          />

        </label>

        <label>
          Section

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >

            {categories.map((category) => (
              <option
                key={category}
              >
                {category}
              </option>
            ))}

          </select>

        </label>

        <label>
          Excerpt

          <textarea
            style={{ minHeight: 100 }}
            value={excerpt}
            onChange={(event) =>
              setExcerpt(event.target.value)
            }
            placeholder="Short summary"
          />

        </label>

        <label>
          Article

          <textarea
            required
            value={body}
            onChange={(event) =>
              setBody(event.target.value)
            }
            placeholder="Write the article here..."
          />

        </label>

        <label>
          Article image

          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              setFile(
                event.target.files?.[0] || null
              )
            }
          />

        </label>

        <button
          className="button"
          type="submit"
        >
          Publish Article
        </button>

        {message && (
          <div className="notice">
            {message}
          </div>
        )}

      </form>

    </main>
  );
}
