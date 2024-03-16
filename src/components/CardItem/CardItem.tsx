import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const CardItem = () => {
  const [categories, setCategories] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategories(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Bu yerda qidiruvni bajarish logikasi joylashadi
    console.log(searchQuery);
  };
  return (
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
                <MenuItem value={"women's clothing"}>women's clothing</MenuItem>
              </Select>
            </FormControl>

            <TextField
              sx={{ m: 1, width: 180 }} // sx propertisi orqali uslubni sozlash
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
  );
};

export default CardItem;
