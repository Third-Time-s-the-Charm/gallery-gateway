import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'

import Portfolios from '../containers/Portfolio'

const PortfolioDashboard = () => (
  <Container>
    <Row className='align-items-baseline'>
      <Col>
        <h1>Portfolio Dashboard</h1>
      </Col>
      <Col md='3'>
        <Button
          color='primary'
          className='btn-block'
          style={{ cursor: 'pointer' }}
          tag={Link}
          to='/portfolio/new'
        >
          Create Portfolio Period
        </Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <Portfolios />
      </Col>
    </Row>
  </Container>
)

export default PortfolioDashboard
