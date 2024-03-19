import axios from "axios";
import { useQuery } from "react-query";
import LinearIndeterminate from "../Loading/Loading";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
};

const fetchData = async (category: string = ""): Promise<Product[]> => {
  let url = "https://fakestoreapi.com/products";
  if (category) {
    url += `/category/${category}`;
  }
  const { data } = await axios.get(url);
  return data;
};

const Card = () => {
  const [categories, setCategories] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [eachProductInfo, setEachProductInfo] = useState<Product | null>(null);
  const { data, error, isLoading, isError } = useQuery<Product[], Error>(
    ["products", categories],
    () => fetchData(categories),
    {
      keepPreviousData: true,
    }
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

  const handleChange = (event: SelectChangeEvent) => {
    setCategories(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchQuery);
  };

  const filteredData = data?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="px-10 py-7">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">Все продукты</div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="demo-select-small-label">
                  Select a Category
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={categories}
                  onChange={handleChange}
                  autoWidth
                  label="Select a Category"
                >
                  <MenuItem value={"electronics"}>electronics</MenuItem>
                  <MenuItem value={"jewelery"}>jewelery</MenuItem>
                  <MenuItem value={"men's clothing"}>men's clothing</MenuItem>
                  <MenuItem value={"women's clothing"}>
                    women's clothing
                  </MenuItem>
                  <MenuItem value={""}>No need</MenuItem>
                </Select>
              </FormControl>

              <TextField
                sx={{ m: 1, width: 180 }}
                size="small"
                variant="outlined"
                label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch} edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="px-10 py-7 flex justify-center gap-8 flex-wrap">
          {filteredData?.map((product) => (
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
    </>
  );
};

export default Card;
