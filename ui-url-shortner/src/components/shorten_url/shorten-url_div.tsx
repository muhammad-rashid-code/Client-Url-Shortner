export default function ShortenURLdiv({
  shortenedUrl,
}: {
  shortenedUrl: string;
}) {
  return (
    <>
      <div>
        <a
          href={shortenedUrl} // Use shortenedUrl dynamically
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortenedUrl}
        </a>
      </div>
    </>
  );
}
