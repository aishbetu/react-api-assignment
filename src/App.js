import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Image, Navbar, Table} from "react-bootstrap";
import axios from 'axios';

class App extends React.Component {
    state = {
        users: [],
    };

    componentDidMount () {
        axios.get('https://5w05g4ddb1.execute-api.ap-south-1.amazonaws.com/dev/profile/listAll')
            .then(response => {
                const users = response.data.list;
                this.setState({ users });
                console.log(this.state.users);
            })
    }

    render() {
        const { users } = this.state;
        users.sort((a, b) => a.status > b.status ?
            1 : a.status < b.status ? -1 : a.date > b.date ?
                1 : a.date < b.date ? -1 : 0);

        return (
        <div className="App">
              <Container fluid>

                  <Navbar bg="light" className="justify-content-md-center">
                      <Navbar.Brand href="#home"><h2 className="display-4" style={{color: "#55efc4"}}>Users Data</h2></Navbar.Brand>
                  </Navbar>


                  <Table striped bordered hover size="sm">
                      <thead>
                      <tr>
                          <th style={{color: "#55efc4"}}>Image</th>
                          <th style={{color: "#55efc4"}}>Name</th>
                          <th style={{color: "#55efc4"}}>Gender</th>
                          <th style={{color: "#55efc4"}}>Age</th>
                          <th style={{color: "#55efc4"}}>Date</th>
                          <th style={{color: "#55efc4"}}>Status</th>
                      </tr>
                      </thead>
                      <tbody>
                      { users.map(user => { return (
                          <tr>
                       <td key={user.id}> <Image src={user.img} thumbnail style={{width: 50}} />
                       </td>
                       <td key={user.id}>{ user.name }</td>
                       <td key={user.id}>{ user.gender }</td>
                       <td key={user.id}>{ user.age }</td>
                       <td key={user.id}>{ user.date }</td>
                       <td key={user.id}>{ user.status }</td>
                          </tr>
                      );
                      }) }

                      </tbody>
                  </Table>
              </Container>
        </div>
      )
}
}

export default App;
