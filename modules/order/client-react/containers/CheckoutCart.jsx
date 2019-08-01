import React from 'react';
import { compose, graphql } from 'react-apollo';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import CheckoutCartView from '../components/CheckoutCartView';
import camera from '../resources/camera.jpg';
import ORDER_QUERY from '../graphql/OrderQuery.graphql';

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
    this.onSubmit = this.onSubmit.bind(this);

    this.deleteProduct = this.deleteProduct.bind(this);
    (this.cart = {
      name: 'Nikon Camera',
      image: camera,
      days: 4,
      date: {
        start: '24-06-19',
        end: '25-06-19'
      },
      refund: 3000,
      rent: 200,
      bookings: [
        {
          name: 'Bishal Deb',
          rating: 3.7,
          start: '20-06-19',
          end: '22-06-19'
        },
        {
          name: 'Rajeev Khanna',
          rating: 4,
          start: '03-07-19',
          end: '12-07-19'
        },
        {
          name: 'Mukesh Babu',
          rating: 2.2,
          start: '13-06-19',
          end: '17-06-19'
        }
      ]
    }),
      (this.state = {
        products: [
          {
            id: 1,
            name: this.cart.name,
            image: this.cart.image,
            days: this.cart.days,
            date: this.cart.date,
            refund: this.cart.refund,
            rent: this.cart.rent,
            bookings: this.cart.bookings
          }
        ],
        deliveryfee: 100,
        modal1Visible: false,
        gst: 18
      });
    this.count = 1;
  }
  setModal1Visible() {
    this.setState({ modal1Visible: !this.state.modal1Visible });
  }

  Addproducts() {
    this.count = this.count + 1;
    let item = this.state.products;
    item.push({
      id: this.count,
      name: this.cart.name,
      image: this.cart.image,
      days: this.cart.days,
      date: this.cart.date,
      refund: this.cart.refund,
      rent: this.cart.rent,
      bookings: this.cart.bookings
    });
    this.setState({
      products: item
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
      products: [...this.state.products.slice(0, index), ...this.state.products.slice(index + 1)]
    });
  }

  editProduct(id, startDate, EndDate) {
    // Edit datat goes here
    let item = this.state.products;
    item.some(item => {
      if (item.id === id) {
        item.date.start = startDate.format('DD-MM-YY');
        item.date.end = EndDate.format('DD-MM-YY');
        item.days = EndDate.diff(startDate, 'days') + 1;
      }
    });

    this.setState({
      products: item
    });
    this.setModal1Visible();
  }

  async onSubmit(values) {
    const { history, navigation } = this.props;

    // Get Values

    console.log('onSubmit Called!');
    // let userValues = pick(values, [
    //   'username',
    //   'email',
    //   'role',
    //   'isActive',
    //   'profile',
    //   'addresses',
    //   'portfolios',
    //   'password'
    // ]);

    // userValues = UserFormatter.trimExtraSpaces(userValues);

    // if (settings.auth.certificate.enabled) {
    //   userValues['auth'] = {
    //     certificate: pick(values.auth.certificate, 'serial')
    //   };
    // }

    // Call Mutation

    // try {
    //   await addUser(userValues);
    // } catch (e) {
    //   message.error(t('userAdd.errorMsg'));
    //   throw new FormError(t('userAdd.errorMsg'), e);
    // }

    // Add Message
    message.info('Success! Select your Billing Address.');

    // Redirect
    if (history) {
      return history.push('/checkout-bill/');
    }
    if (navigation) {
      return navigation.goBack();
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
        onSubmit={this.onSubmit}
        {...this.props}
      />
    );
  }
}

export default compose(
  translate('order'),
  graphql(ORDER_QUERY, {
    props: ({ mutate }) => ({
      addUser: async input => {
        const { data: addUser } = await mutate({
          variables: { input }
        });
        return addUser;
      }
    })
  })
)(CheckoutCart);
