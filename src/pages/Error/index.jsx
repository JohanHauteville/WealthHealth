import image from "../../assets/img/404.png";
import "./styles.scss";

function Error() {
  return (
    <section className="error-page">
      <img src={image} alt="Error 404" />
      <p>Ouhps!... La page est introuvable</p>
    </section>
  );
}

export default Error;
