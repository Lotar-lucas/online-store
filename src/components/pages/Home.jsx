import React, { Component } from 'react';
import CartBtn from '../buttonsAndLinks/CartBtn';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import ListCategories from '../ListCategories';
import SearchBox from '../SearchBox';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      listCategories: [],
      listProducts: '',
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    this.setState({
      listCategories: await getCategories(),
    });
  }

  async fetchProducts(event) {
    const { value } = event.target;
    this.setState({
      listProducts: await getProductsFromCategoryAndQuery('', value),
    });
  }

  render() {
    const { listCategories, listProducts } = this.state;
    return (
      <>
        <CartBtn />
        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <ListCategories categories={ listCategories } />
        </div>
        <SearchBox onFetchProducts={ this.fetchProducts } listProducts={ listProducts } />
      </>
    );
  }
}
