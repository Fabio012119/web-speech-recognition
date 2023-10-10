import config from "./Navigation.config.json";

const Links = () => {
  const { linksList } = config;

  return (
    <ul className="links-list">
      {linksList.map((item, index) => (
        <li key={index} className="nav-links">
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Links;
