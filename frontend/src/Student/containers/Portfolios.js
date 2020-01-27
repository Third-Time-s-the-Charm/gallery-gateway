import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import ShowsQuery from '../queries/shows.graphql'
import PortfoliosQuery from '../queries/portfoliosByStudent.graphql'
import Portfolios from '../components/Portfolios'
import { displayError } from '../../shared/actions'

const mapStateToProps = state => ({
  studentUsername: state.shared.auth.user.username
})

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(ShowsQuery, {
    props: ({ data: { shows, loading, error } }) => ({
      shows,
      loading,
      error
    }),
    options: ownProps => ({
      variables: {
        studentUsername: ownProps.studentUsername
      }
    })
  }),
  graphql(PortfoliosQuery,{
    name: "portfolios",
    options: ownProps => ({
      variables: {
        studentUsername: ownProps.studentUsername
      }
    })    
  })
)(Portfolios)
