import "./css/footer.css";
export default function Footer({ title, weekday, date, url }) {
  return (
    <>
      <footer>
        <div className="infoPoster">
          <img className="footerPoster" src={url} alt="poster" />

          <div className="infoMovie">
            <p>{title}</p>
            {weekday} - {date}
          </div>
        </div>
      </footer>
    </>
  );
}
