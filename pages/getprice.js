import Papa from "papaparse";
import { useState } from "react";

const BrandSearch = ({ price }) => {
  const [pricelist, setPricelist] = useState([]);

  async function parcingCsvToArray(e) {
    e.preventDefault();
    Papa.parse(price, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const cleardata = results.data.map(function (product) {
          return product.Артикул;
        });
        setPricelist(cleardata);
      },
    });
  }

  const sentToServer = async (data) => {
    console.log(data);
    const prices = data.slice(105000, 110000);
    let token = await fetch("https://api.edetal.store/postprice", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        prices,
      }),
    });
    const resultInJson = await token.json();
    console.log(resultInJson);
  };

  const sentToServer1 = async (data) => {
    const prices = data.slice(5000, 10000);
    let token = await fetch("https://api.edetal.store/postprice", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        prices,
      }),
    });
    const resultInJson = await token.json();
    console.log(resultInJson);
  };

  return (
    <div>
      <button onClick={(e) => parcingCsvToArray(e)}> Пробуємо! </button>
      <button onClick={() => sentToServer(pricelist)}>
        {" "}
        Надіслати на сервер1{" "}
      </button>
      <button onClick={() => sentToServer1(pricelist)}>
        {" "}
        Надіслати на сервер1{" "}
      </button>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res1 = await fetch(`https://api.edetal.store/getprices`, {
    method: "GET",
  });

  const body1 = await res1.json();

  return {
    props: {
      price: body1,
    },
  };
};

export default BrandSearch;
