import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button} from 'reactstrap'
import { Link } from 'react-router-dom'

import ScholarshipSelectorTable from "../../shared/components/ScholarshipSelectorTable";
import ScholarshipSelectorCard from "../../shared/components/ScholarshipSelectorCard";
import Loading from "../../shared/components/Loading";
const _ = require('lodash')

class ViewScholarshipsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: {}};
  }

  static propTypes = {
    scholarship: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object
  };

  static defaultProps = {
    scholarship: []
  };

  onChange = newSelected => {
    this.setState({selected: newSelected})
  };

  render () {
    const { loading, portfolioPeriod } = this.props;
    const scholarships = _.get(portfolioPeriod, 'scholarships')
    return (
      <div>
        {console.log(this.props)}
        <h2><Link to='/portfolio'><Button color='primary'>Back to Portfolio</Button></Link></h2>
      <Row>
        <Col>
          {loading ? (
            <Loading />
          ) : (
            <ScholarshipSelectorTable
              selected={this.state.selected}
              dataPoints={scholarships}
              unique={"id"}
              onChange={this.onChange}
              cardTemplate={ScholarshipSelectorCard}
              cardTemplateProps={{
                onDelete: undefined,
                onEdit: undefined
              }}
            />
          )}
        </Col>
      </Row>
      </div>
    );
  }
}

export default ViewScholarshipsTab
