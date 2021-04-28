import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Fade,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap'
import SuccessModal from './SuccessModal'
import ScholarshipsTable from 'shared/components/ScholarshipsTable'

class PortfolioSubmissionModal extends Component {
    static propTypes = {
      handleError: PropTypes.func.isRequired,
      submitPortfolio: PropTypes.func.isRequired,
      isOpen: PropTypes.bool.isRequired,
      toggleFunction: PropTypes.func.isRequired,
      portfolio: PropTypes.shape({
        id: PropTypes.string,
        submitted: PropTypes.bool,
        pieces: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            path: PropTypes.string,
            pieceType: PropTypes.oneOf(['PHOTO', 'VIDEO', 'OTHER']).isRequired,
            title: PropTypes.string.isRequired
          })
        ),
        portfolioPeriod: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          numPieces: PropTypes.number.isRequired,
          entryEnd: PropTypes.string,
          entryStart: PropTypes.string,
          scholarships: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              requiresEssay: PropTypes.bool
            })
          )
        }),
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string
      }).isRequired
    }

    static defaultProps = {
      portfolio: {
        pieces: []
      }
    }

    state = {
      displaySubmissionSuccess: false,
      selectedScholarships: {},
      isValidSubmission: false,
      submissionError: ''
    }

    closeSuccessModal = () => {
      this.setState({ displaySubmissionSuccess: false })
    }

    openSuccessModal = () => {
      this.setState({ displaySubmissionSuccess: true }, () => {
        setTimeout(this.closeSuccessModal, 4000)
      })
    }

    handleSelectedScholarshipsChange = selectedScholarships => {
      const { portfolio } = this.props
      const { portfolioPeriod } = this.props.portfolio

      const scholarshipIDs = Object.keys(selectedScholarships)

      const scholarshipRequiredPieces = scholarshipIDs.map(ID => {
        // Creates array of required photo sizes
        return portfolioPeriod.scholarships.find(scholarship => scholarship.id === ID).requiredPhotos
      })

      // Portfolio validation
      // Ensures the portfolio to be submitted has the appropriate number of pieces
      // TODO - add validation for yearLevel & academic program
      let errorMessage = ''
      let isValid = false
      if (!scholarshipIDs.length > 0) {
        errorMessage = 'Please select at least one scholarship'
      } else if (portfolio.pieces.length < Math.max(...scholarshipRequiredPieces)) {
        errorMessage = 'One of the selected scholarships requires more images than you have uploaded'
      } else {
        errorMessage = ''
        isValid = true
      }

      this.setState({ selectedScholarships, isValidSubmission: isValid, submissionError: errorMessage })
    }

    render () {
      const { portfolio, isOpen, toggleFunction, submitPortfolio, handleError } = this.props

      return (
        <Fragment>
          <Modal
            isOpen={isOpen}
          >
            <ModalHeader toggle={toggleFunction}>
            Scholarship Selection
            </ModalHeader>
            <ModalBody>
              <ScholarshipsTable scholarships={portfolio.portfolioPeriod.scholarships}
                selected={this.state.selectedScholarships}
                onChange={this.handleSelectedScholarshipsChange}
                studentView={true} />
            </ModalBody>
            <ModalFooter>
              <Fade in={!this.state.isValidSubmission}>{this.state.submissionError}</Fade>
              <Button
                color='secondary'
                onClick={toggleFunction}
              >
              Cancel
              </Button>
              <Button
                color='primary'
                disabled={!this.state.isValidSubmission}
                onClick={() => {
                  const selectedScholarships = Object.keys(this.state.selectedScholarships)
                  submitPortfolio(portfolio.id, selectedScholarships)
                    .then(() => {
                      toggleFunction()
                      this.openSuccessModal()
                    })
                    .catch(err => {
                      toggleFunction()
                      handleError(err.message)
                    })
                }}
              >
              Submit Application
              </Button>
            </ModalFooter>
          </Modal>
          <SuccessModal
            isOpen={this.state.displaySubmissionSuccess}
            customBodyText={'Your portfolio was successfully submitted to the scholarships you selected. You will be notified if you have been selected to receive a scholarship once judging is complete.'}/>
        </Fragment>
      )
    }
}

export default PortfolioSubmissionModal
