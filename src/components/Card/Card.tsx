import axios from "axios";
import { useQuery } from "react-query";
import React from "react";

type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
};

const fetchData = async (): Promise<Product[]> => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};
const Card = () => {
  const { data, error, isLoading, isError } = useQuery<Product[], Error>(
    "products",
    fetchData
  );

  if (isLoading) return <div className="px-10 py-7">Loading...</div>;
  if (isError) return <div className="px-10 py-7">Error: {error.message}</div>;
  return (
    <div>
      <div className="px-10 py-7 flex justify-center gap-8 flex-wrap">
        {data?.map((product) => (
          <div
            key={product.id}
            className="px-2 py-3 rounded-[30px] flex items-center justify-around gap-3 flex-col w-64 h-96 border-solid border-2 border-gray-200 hover:-translate-y-1 hover:scale-110 hover:duration-500 hover:shadow-sm"
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
    </div>
  );
};

export default Card;
