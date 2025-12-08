import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <Button variant={"ghost"} size={"icon"}>
      <Search className="size-5" />
    </Button>
  );
};

export default SearchBar;
