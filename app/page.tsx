import ArticleCard from "@/components/ArticleCard";
import { supabase } from "@/lib/supabase";

export const revalidate = 30;

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{
    category?: string;
  }>;
}) {

  const params = await searchParams;

  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", {
      ascending: false
    });

  if (params.category) {
    query = query.eq(
      "category",
      params.category
    );
  }

  const { data = [] } = await query.limit(20);

  const lead = data[0];

  return (

    <main className="container">

      {lead ? (

        <section className="hero">

          <article className="lead reveal">

            {lead.image_url && (
              <img
                src={lead.image_url}
                alt=""
              />
            )}

            <div className="leadcopy">

              <div className="kicker">
                {lead.category}
              </div>

              <div className="headline serif">
                {lead.title}
              </div>

              <p>
                {lead.excerpt}
              </p>

            </div>

          </article>

          <div className="side">

            {data
              .slice(1, 4)
              .map((article: any) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                />
              ))}

          </div>

        </section>

      ) : (

        <section className="hero">

          <div>

            <h1 className="headline serif">
              Question everything.
              <br />
              Publish what survives.
            </h1>

            <p className="muted">
              Your newsroom is ready.
              Add the first article from
              the Editor panel.
            </p>

          </div>

        </section>

      )}

      <div className="sectionhead">

        <h2 className="serif">
          {params.category || "Latest"}
        </h2>

        <span className="muted">
          Medius & Verax
        </span>

      </div>

      <section className="grid">

        {data
          .slice(4)
          .map((article: any) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}

      </section>

      <footer className="footer">

        <div className="container footergrid">

          <div>

            <h2 className="serif">
              The Anapa
            </h2>

            <p>
              Independent media built around
              evidence, context and questions.
              Medius & Verax.
            </p>

          </div>

          <div>

            <b>Sections</b>

            <p>
              Lok Sabha
              <br />
              Supreme Court
              <br />
              Market
              <br />
              Sports
              <br />
              Agriculture
            </p>

          </div>

          <div>

            <b>Newsroom</b>

            <p>
              Corrections
              <br />
              Editorial standards
              <br />
              Contact
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}
