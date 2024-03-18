import axios from "axios";
import { useQuery } from "react-query";
import LinearIndeterminate from "../Loading/Loading";
import { useState } from "react";

type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
};

const fetchData = async (): Promise<Product[]> => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

const Card = () => {
  const [eachProductInfo, setEachProductInfo] = useState<Product | null>(null);
  const { data, error, isLoading, isError } = useQuery<Product[], Error>(
    "products",
    fetchData
  );

  if (isLoading)
    return (
      <div className="px-10 py-7">
        <LinearIndeterminate />
      </div>
    );
  if (isError) return <div className="px-10 py-7">Error: {error.message}</div>;

  const handleMoreInfo = (product: Product) => {
    setEachProductInfo(product);
  };

  return (
    <div className="relative">
      <div className="px-10 py-7 flex justify-center gap-8 flex-wrap">
        {data?.map((product) => (
          <div
            key={product.id}
            onClick={() => handleMoreInfo(product)}
            className="px-2 py-3 rounded-[30px] flex items-center justify-around gap-3 flex-col w-64 h-96 border-solid border-2 border-gray-200 hover:-translate-y-1 hover:scale-110 hover:duration-500 hover:shadow-sm cursor-pointer ease-in duration-100"
          >
            <img src={product.image} alt="" className="w-44 h-44" />
            <h1 className="text-base text-center">{product.title}</h1>
            <div className="flex items-center justify-between w-full px-10">
              <p>{product.price}</p>
              <div className="border-solid border-2 border-gray-300 flex items-center justify-center text-xl rounded-lg text-gray-400 px-2">
                +
              </div>
            </div>
          </div>
        ))}
      </div>
      {eachProductInfo && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-60"
            onClick={() => setEachProductInfo(null)}
          ></div>
          <div className="fixed top-0 right-0 w-96 h-full p-5 bg-white shadow-lg rounded-lg z-10 flex  items-center flex-col text-justify gap-5 overflow-y-scroll">
            <img
              src={eachProductInfo.image}
              alt={eachProductInfo.title}
              className="w-60 h-60"
            />
            <h2>{eachProductInfo.title}</h2>
            <p>{eachProductInfo.description}</p>
            <p>
              {eachProductInfo.category} ${eachProductInfo.price}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
