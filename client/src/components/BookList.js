import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import '../assets/css/main.css';
import { Container, Row, Col } from 'react-grid-system';

const getCharitiesQuery = gql`
    {
        charities {
            title
        }
    }
`;

class BookList extends Component {
    renderTiles(){
        if (this.props.data.charities !== undefined) {
            const charities = this.props.data.charities
            charities.map(charity => {
                console.log(charity.title)
                return(<p> {charity.title} </p>);
            });
        }
        else {
            return (<div>None</div>)
        }
    }
    render(){
        var listItems = (<div className = "loading_div">Loading</div>)
        if (this.props.data.charities !== undefined) {
            const charities = this.props.data.charities
            listItems = charities.map((charity) =>
            <Col sm={4}>
            <div className = "search_tile">
                <h1>{charity.title}</h1>
            </div>
            </Col>
            );
        }
        return(
            <Container>
            <Row>
                {listItems}
            </Row>
          </Container>
        );
    }
}

export default graphql(getCharitiesQuery)(BookList);