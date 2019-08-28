import React, { Component } from "react";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import * as _ from "lodash";

const PRODUCTS = gql`{
  products {
  }
}`;

export class App extends Component {
  render() {
    return (
      <Query query={PRODUCTS}>
        {
          ({ loading, error, data }) => (
            loading 
              ? (<>Data not found...</>) 
              : (
                <ul>{
                  data.products && _.map(data.products, (item, i) =>{
                    return (
                      <li key={i}>{
                        _.map(_.keys(item), (key, j) =>
                          key !== '__typename' && <span>{item[key]}<br /></span>
                        )
                      }</li>
                    );
                  })
                }</ul>
              )
          )
        }
      </Query>
    );
  }
}
