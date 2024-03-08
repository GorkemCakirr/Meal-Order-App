import image from "../assets/logo.jpg";

export default function Header() {
  return (
    <>
      <div id="title">
        <img src={image} alt="" />
        <h1>REACTFOOD</h1>
      </div>
    </>
  );
}
