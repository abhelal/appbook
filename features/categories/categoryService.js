import axios from "@libs/axios";

// get categories

const getCategories = async () => {
  const res = await axios.get("/category/getCategory");
  if (res.data?.data) {
    localStorage.setItem("categories", JSON.stringify(res.data.data));
  }
  return res.data;
};

const categoryService = {
  getCategories,
};

export default categoryService;
