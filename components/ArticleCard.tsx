type Article = {
  id: string;
  title: string;
  excerpt?: string;
  category: string;
  image_url?: string;
  published_at?: string;
};

export default function ArticleCard({
  article
}: {
  article: Article;
}) {

  return (
    <article className="card reveal">

      {article.image_url && (
        <img
          src={article.image_url}
          alt=""
        />
      )}

      <div className="cardbody">

        <div className="kicker">
          {article.category}
        </div>

        <h3>
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="muted">
            {article.excerpt}
          </p>
        )}

        {article.published_at && (
          <small className="muted">
            {new Date(
              article.published_at
            ).toLocaleDateString("en-IN")}
          </small>
        )}

      </div>

    </article>
  );
}
