import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from "react-apollo";

import PortfolioPeriod from "../../Admin/queries/portfolioPeriod.graphql"
import ViewScholarshipsTab from "../components/ViewScholarshipsTab";
import { displayError } from "../../shared/actions";

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
});

export default compose(
  connect( mapDispatchToProps),
  graphql(PortfolioPeriod, {
    props: ({data: { portfolioPeriod, loading, error } }) => ({
      portfolioPeriod,
      loading,
      error
    }),
    options: ownProps => ({
      variables: {
        id: ownProps.id
      }
    })
  }),
)(ViewScholarshipsTab)
