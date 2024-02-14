# sylvan-library
lending client

The goal: To tie into echoMTG's database and use the colleciton there to search for available items, remove items from the colleciton when they are being loaned out, then return them to the collection when they are returned.

## Firing up Your Gitpod workspace
cd into sylvan library.
Dont forget to npm install!  You need to make sure your new workspace has everything you need
Then npm start to check out your 

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
  <li>Unrequested: The borrower has started a reservation, but has not yet submitted it.</li>
  <li>Pending:  The borrower has requested the reservation, but the admin has not yet approved it</li>
  <li>Approved: The lender has approved a reservation, but the cards are not yet in the borrower's posession</li>
  <li>Delivered: The borrower has posession of the reservation</li>
  <li>Borrowed: The borrower has posession of the reservation and has confirmed that it is complete.</li>
  <li>Disputed: the borrower has posession of the reservation, but there are one or more cards missing or in conditions that do not match expectations</li>
  <li>Late: The agreed upon return date has passed and the items have not been returned</li>
  <li>Delinquent: X days have passed since the agreed upon return date.  The borrower has received a delinquent strike.  (lender can choose to disallow borrowers with one or more delinquent strikes)</li>
  <li>Lost: The borrower has lost at least one of the reserved items.  Remediation is necessary.</li>
  <li>Returned: the reservation has been returned and is no longer in the borrower's posession, but the lender has not yet confirmed that all of the cards are present and in the expected condition</li>
  <li>Complete: the reservation has been returned and the lender has confirmed that all of the cards are present in reasonable condition</li>
  <li>Incomplete: the reservation has been returned and is in the lender's posession, but there are one or more cards missing or in conditions that do not match expectations</li>
</ul>
### Reservation Workflow
![Start](https://github.com/anthony-devarti/sylvan-library/assets/98314025/8269b06d-da83-4a0b-8849-64469bc6170e)



## Echo MTG integration
This appilicaiton is designed to integrate with echoMTG's api.  I want to get this to a vaguely "working" ish state before I bug them about giving me a static access token.  Until that point, we will need to use a rotating access token that changes daily.  You will need to log in to grab that.  For everyone's convenience, the token is saved in the App Constants file, so if the token needs to be used elsewhere in the future, we can just use that variable and only have to update one thing.

## Development Plan for V1
Note that we don't have any real sprints for this, so I'm just lumping things into vague cycles.
<ul>
  <li>
Cycle 1 - We plan to be able to get the reservation through the workflow correctly once, assuming the user or the lender never fuck anything up.  Notably, there may not be actual road in front of the negative choices in the ui, like if a card is lost, damaged, or not present during the handoff from lender to borrower or vice versa.  That's OK for this cycle.  We should still have error handling for when the application does something it's not supposed to, though
  </li>
  <li>
Cycle 2 - Move through the workflow to include handling for something that a human being does that they're not supposed to.  Things like damaging cards, losing cards, the lender not being able to find something in inventory, forgetting something and needing to correct it immediately.  stuff like that.  This will likely modify some of the success states that we created during cycle 1
  </li>
  <li>
Cycle 3 - Testing:  This is where we stress-test this puppy and try to find corner cases that we have not planned for in regards to human actions.  There's probably something that someone will want to do that we haven't thought of yet.  Also, finding bugs where the application is not doing something that we think it should.  
  </li>
  <li>
Cycle 4 - V1 release:  All the bullshit that comes along with releasing something
  </li>
</ul>

## V2 Features
<ul>
  <li>
-a lender interface/dashboard that means the lender doesn't need to mess around in django admin
  </li>
  <li>
-alerts for decision points
  </li>
</ul>

## Vince was here