import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import ShoppingCartPage from './components/pages/ShoppingCartPage';
import ItemProduct from './components/pages/ItemProduct';

class App extends Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
    };

    this.getProduct = this.getProduct.bind(this);
  }

  getProduct(product) {
    this.setState(({ shoppingCart }) => ({
      shoppingCart: [...shoppingCart, product],
    }));
  }

  render() {
    const { shoppingCart } = this.state;
    return (
      <BrowserRouter>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (<Home
                { ...props }
                getProduct={ this.getProduct }
              />) }
            />
            <Route
              exact
              path="/shopping-cart"
              render={ (props) => (<ShoppingCartPage
                { ...props }
                itemShoppingCart={ shoppingCart }
              />) }
            />
            <Route
              exact
              path="/:id"
              render={
                (props) => (
                  <ItemProduct
                    { ...props }
                    getProduct={ this.getProduct }
                  />)
              }
            />
          </Switch>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;
