import axios from "axios";
import { useState, useEffect } from "react";

const PizzaOrder = () => {

  //unwanted code start
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      // ...
    }
    fetchData();
  }, []);
  //unwanted code end
  

  const [formData, setFormData] = useState({
    people: "",
    pieces: "",
  });
  
  //test comment 123456
  const { people, pieces } = formData;

  const pizzaDetails = [
    {
      size: 5,
      price: 3,
      pieces: 4,
    },
    {
      size: 7,
      price: 5,
      pieces: 6,
    },
    {
      size: 10,
      price: 8,
      pieces: 10,
    },
    {
      size: 15,
      price: 12,
      pieces: 15,
    },
    {
      size: 24,
      price: 18,
      pieces: 24,
    },
  ];

  // final cost suggestions
  const [priceSuggestions, setPriceSuggestions] = useState([]);

  // minimum cost
  const [minPrice, setMinPrice] = useState(0);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const totalPieces = formData.people * formData.pieces;
    let array = [];
    let minPrice = 0;

    // looping through all available options
    for (let i = 0; i < pizzaDetails.length; i++) {
      //check whether total pieces customer wants is greater than pieces include in one pizza
      if (pizzaDetails[i].pieces < totalPieces) {
        // calculate approximate no. of pizzas can offer
        const approximateTotalPizzas =
          parseInt(totalPieces / pizzaDetails[i].pieces) + 1;

        // calculate total cost for the pizza option
        const totalPrice = pizzaDetails[i].price * approximateTotalPizzas;

        // put cost details of pizza option to temporary array
        array.push({
          option: pizzaDetails[i].size,
          pricePerPizza: pizzaDetails[i].price,
          noOfPizzas: approximateTotalPizzas,
          piecesPerPizza: pizzaDetails[i].pieces,
          totalCost: totalPrice,
        });

        //check whether total cost is less than minimum cost
        if (minPrice === 0) {
          minPrice = totalPrice;
        } else if (totalPrice < minPrice) {
          minPrice = totalPrice;
        }
      }

      //check whether total pieces customer wants is less than pieces include in one pizza
      else if (pizzaDetails[i].pieces >= totalPieces) {
        // put cost details of pizza option to temporary array
        array.push({
          option: pizzaDetails[i].size,
          pricePerPizza: pizzaDetails[i].price,
          noOfPizzas: 1,
          piecesPerPizza: pizzaDetails[i].pieces,
          totalCost: pizzaDetails[i].price,
        });

        //check whether total cost is less than minimum cost
        if (minPrice === 0) {
          minPrice = pizzaDetails[i].price;
        } else if (pizzaDetails[i].price < minPrice) {
          minPrice = pizzaDetails[i].price;
        }
      }
    }
    setPriceSuggestions(array);
    setMinPrice(minPrice);
  };

  return (
    <div>
      <form className="p-4 mb-3" onSubmit={(e) => onSubmit(e)}>
        <div class="row">
          <div className="col-lg-6">
            <label for="exampleFormControlInput1" className="form-label">
              No. of People
            </label>
            <input
              type="number"
              className="form-control"
              value={people}
              name="people"
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-lg-6">
            <label for="exampleFormControlInput1" className="form-label">
              No. of Pieces
            </label>
            <input
              type="number"
              className="form-control"
              value={pieces}
              name="pieces"
              required
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Submit
        </button>
      </form>

      <h3>Price Suggestions</h3>
      <div class="p-4 mb-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Price per Pizza</th>
              <th scope="col">Pieces per Pizza</th>
              <th scope="col">No of Pizzas</th>
              <th scope="col">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {priceSuggestions.map((i, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: i.totalCost === minPrice && "yellow",
                }}
              >
                <td>{i.option + " inches"}</td>
                <td>{"$ " + i.pricePerPizza}</td>
                <td>{i.piecesPerPizza}</td>
                <td>{i.noOfPizzas}</td>
                <td>{"$ " + i.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PizzaOrder;
