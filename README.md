# sylvan-library
lending client

The goal: To tie into echoMTG's database and use the colleciton there to search for available items, remove items from the colleciton when they are being loaned out, then return them to the collection when they are returned.

## User Types:
### Lender - controls the collection (admin)
### Borrower - can choose to rent or return items

## Routes: 
<ul>
<li>My Profile: Shows cards that you are currently borrowing and your standing in those reservations</li>
<li>Home</li>
</ul>

## Terms:
Reservation - a collection of cards that is currently being borrowed.  Reservations can be pending, approved, delivered, disputed, late, delinquent, returned, complete, or incomplete
<ul>
  <li>Pending:  The borrower has requested the reservation, but the admin has not yet approved it</li>
  <li>Approved: The lender has approved a reservation, but the cards are not yet in the borrower's posession</li>
  <li>Delivered: The borrower has posession of the reservation</li>
  <li>Disputed: the borrower has posession of the reservation, but there are one or more cards missing or in conditions that do not match expectations</li>
  <li>Late: The agreed upon return date has passed and the items have not been returned</li>
  <li>Delinquent: X days have passed since the agreed upon return date.  The borrower has received a delinquent strike.  (lender can choose to disallow borrowers with one or more delinquent strikes)</li>
  <li>Returned: the reservation has been returned and is no longer in the borrower's posession, but the lender has not yet confirmed that all of the cards are present and in the expected condition</li>
  <li>Complete: the reservation has been returned and the lender has confirmed that all of the cards are present in reasonable condition</li>
  <li>Incomplete: the reservation has been returned and is in the lender's posession, but there are one or more cards missing or in conditions that do not match expectations</li>
</ul>


## Echo MTG integration
This appilicaiton is designed to integrate with echoMTG's api.  I want to get this to a vaguely "working" ish state before I bug them about giving me a static access token.  Until that point, we will need to use a rotating access token that changes daily.  You will need to log in to grab that.  For everyone's convenience, the token is saved in the App Constants file, so if the token needs to be used elsewhere in the future, we can just use that variable and only have to update one thing.
