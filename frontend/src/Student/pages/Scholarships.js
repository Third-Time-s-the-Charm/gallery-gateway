import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import ViewScholarshipsTab from '../containers/ViewScholarshipsTab'

const addIdPropFromQueryParams = () => {
  return id

}

const Scholarships = (props) => {
  return (

  <Container>
    <Row>
      <Col>
        <ViewScholarshipsTab id={props.match.params.portfolioPeriodID} />
      </Col>
    </Row>
  </Container>
)}

export default Scholarships
