import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'

import Shows from '../containers/Shows'

const Dashboard = () => (
  <Container>
    <Row>
      <Col>
        <h1>Dashboard</h1>
        <Shows />
      </Col>
      <Col md='3'>
        <Link to='show/create'><Button color='primary' style={{cursor: 'pointer'}}>Create Show</Button></Link>
      </Col>
    </Row>
  </Container>
)

export default Dashboard
