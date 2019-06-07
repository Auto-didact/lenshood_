import React from "react";

import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import CheckoutCartView from "../components/CheckoutCartView";
import camera from "../resources/camera.jpg";

// interface PagesProps {
//   t: TranslateFunction;
// }

class CheckoutCart extends React.Component {
  constructor(props) {
    super(props);
    //does whatever stuff
    this.Addproducts = this.Addproducts.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.setModal1Visible = this.setModal1Visible.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = {
      cart: {
        name: "Nikon Camera",
        image: camera,
        days: 4,
        date: {
          start: "04-01-19",
          end: "07-01-19"
        },
        refund: 3000,
        rent: 200
      },
      products: [
        {
          name: "Nikon Camera",
          image: camera,
          id: 1,
          days: 4,
          date: {
            start: "04-01-19",
            end: "07-01-19"
          },
          refund: 3000,
          rent: 200
        }
      ],
      deliveryfee: 100,
      modal1Visible: false,
      gst: 18
    };
    this.count = 1;
  }
  setModal1Visible() {
    this.setState({ modal1Visible: !this.state.modal1Visible });
  }

  Addproducts() {
    this.count = this.count + 1;
    this.setState({
      products: [
        ...this.state.products,
        {
          id: this.count,
          name: this.state.cart.name,
          image: this.state.cart.image,
          days: this.state.cart.days,
          date: this.state.cart.date,
          refund: this.state.cart.refund,
          rent: this.state.cart.rent
        }
      ]
    });
  }

  deleteProduct(id) {
    // CODE FOR Deleting THE POST WILL GO HERE
    var i, index;
    for (i = 0; i < this.state.products.length; i++) {
      if (this.state.products[i].id === id) {
        index = i;
        break;
      }
    }
    this.setState({
      products: [
        ...this.state.products.slice(0, index),
        ...this.state.products.slice(index + 1)
      ]
    });
  }

  editProduct(id, startDate, EndDate) {
    // Edit datat goes here
    if (EndDate.diff(startDate, "days") < 0) {
      alert("Error in date input");
    } else {
      var i;
      for (i = 0; i < this.state.products.length; i++) {
        if (this.state.products[i].id === id) {
          this.state.products[i].date.start = startDate.format("DD-MM-YY");
          this.state.products[i].date.end = EndDate.format("DD-MM-YY");
          this.state.products[i].days = EndDate.diff(startDate, "days") + 1;
          break;
        }
      }
      this.setModal1Visible();
    }
  }
  render() {
    return (
      <CheckoutCartView
        state={this.state}
        deleteProduct={this.deleteProduct}
        Addproducts={this.Addproducts}
        editProduct={this.editProduct}
        setModal1Visible={this.setModal1Visible}
        {...this.props}
      />
    );
  }
}

export default translate("order")(CheckoutCart);
