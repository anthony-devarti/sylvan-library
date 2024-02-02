export const ECHO_TOKEN = '211999a78ac4d3875b0a4f1cc9321ad33f8744ab';

export const baseURL = 'http://127.0.0.1:8000/'

export const openReservationMessages = {
    pending: 'The lender has been sent your reservation.  They will approve it soon',
    approved: 'The lender has agreed to your reservation request.  They are collecting the cards and will have them for you via the agreed-upon delivery method.',
    delivered: 'The lender has delivered the cards.  The borrower should review the reservation and confirm that everything is present and in the expected condition',
    borrowed: 'The cards are currently in the posession of the borrower. glhf',
    returned: 'The cards have been returned.  The lender is reviewing the reservation and confirming that everything is present and in the expected condition'
}

export const reservationStage = {
    unsubmitted: 13,
    pending: 1,
    approved: 2,
    delivered: 3,
    disputed: 4,
    late: 5,
    delinquent: 6,
    returned: 7,
    complete: 8,
    incomplete: 9,
    borrowed: 11
}