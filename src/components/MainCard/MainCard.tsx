import Card from "../Card/Card";
import CardItem from "../CardItem/CardItem";
import Header from "../Header/Header";

const MainCard = () => {
  return (
    <div className="max-w-7xl h-full bg-white mx-auto mt-16 rounded-2xl">
      <Header />
      <hr />
      <CardItem />
      <Card />
    </div>
  );
};

export default MainCard;
