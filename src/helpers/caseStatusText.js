/* eslint-disable */
/**
 * Get the case text based on the case status number.
 */
export const getCaseStatusText = (input) => {

  switch (input.case_status) {
    case 1:
      return {
        ...input,
        text: "Awaiting Diagnosis"
      }
    case 2:
      return {
        ...input,
        text: "Diagnosis Completed"
      }
    case 3:
      return {
        ...input,
        text: "Case In Progress"
      }
    case 4:
      return {
        ...input,
        text: "Case Archive"
      }
    case 5:
      return {
        ...input,
        text: "Case Terminated/Rejected"
      }
    default:
      return {
        ...input,
        text: "Awaiting Diagnosis"
      }
  }
}