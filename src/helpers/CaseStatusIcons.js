/* eslint-disable */
import React from 'react'

const CaseStatusIcons = ({ rowData }) => {
  return (
    <React.Fragment>
      {
        rowData.case_status === 1 ?
          <span>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.0001 45.8327C36.506 45.8327 45.8334 36.5053 45.8334 24.9994C45.8334 13.4934 36.506 4.16602 25.0001 4.16602C13.4941 4.16602 4.16675 13.4934 4.16675 24.9994C4.16675 36.5053 13.4941 45.8327 25.0001 45.8327Z" stroke="#F37335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M25 12.5V25L33.3333 29.1667" stroke="#F37335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </span>

          : rowData.case_status === 2 ?

            <span>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45.8334 23.0829V24.9996C45.8309 29.4921 44.3761 33.8635 41.6862 37.4617C38.9963 41.0599 35.2153 43.6922 30.9071 44.966C26.5989 46.2398 21.9944 46.0868 17.7802 44.5299C13.5661 42.973 9.96811 40.0956 7.52292 36.3268C5.07772 32.558 3.91631 28.0997 4.21191 23.6169C4.5075 19.1341 6.24426 14.8669 9.16316 11.4518C12.0821 8.03668 16.0267 5.6566 20.4088 4.66653C24.7909 3.67645 29.3756 4.12942 33.4793 5.95789" stroke="#56AB2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M45.8333 8.33398L25 29.1882L18.75 22.9382" stroke="#56AB2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            : rowData.case_status === 3 ?

              <span>
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M47.9167 8.33398V20.834H35.4167" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" />
                  <path
                    d="M42.6874 31.2499C41.3332 35.083 38.7698 38.3722 35.3836 40.6218C31.9973 42.8713 27.9717 43.9593 23.9133 43.7219C19.8549 43.4845 15.9836 41.9345 12.8827 39.3054C9.7819 36.6764 7.61954 33.1107 6.72151 29.1458C5.82347 25.1809 6.23841 21.0315 7.90379 17.3229C9.56918 13.6143 12.3948 10.5475 15.9548 8.58453C19.5149 6.62156 23.6164 5.86883 27.6415 6.43975C31.6666 7.01067 35.397 8.87432 38.2708 11.7499L47.9166 20.8332"
                    stroke="#1976D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              : rowData.case_status === 4 ?

                <span>
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43.75 16.666V43.7493H6.25V16.666" stroke="#FD1D1D" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" />
                    <path d="M47.9166 6.25H2.08325V16.6667H47.9166V6.25Z" stroke="#FD1D1D" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.8333 25H29.1666" stroke="#FD1D1D" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                </span>

                : rowData.case_status === 5 ?

                  <span>
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.0001 45.8327C36.506 45.8327 45.8334 36.5053 45.8334 24.9994C45.8334 13.4934 36.506 4.16602 25.0001 4.16602C13.4941 4.16602 4.16675 13.4934 4.16675 24.9994C4.16675 36.5053 13.4941 45.8327 25.0001 45.8327Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M31.25 18.75L18.75 31.25" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18.75 18.75L31.25 31.25" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  : ''
      }
    </React.Fragment >
  )
}

export default CaseStatusIcons