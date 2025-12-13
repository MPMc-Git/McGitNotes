## :cloud: Salesforce.com Free Tier Notes

!!! abstract
    I have a free tier environment. VERY limited. This is just me trying to make it usable and a very pretty rolodex

!!! danger "No Custom Objects"
    It will let you create the Custom Object until you try to Save - then it tells you that you have exceeded your total available amount of Custom Objects.

!!! danger "Limited Number of Flows"
    I think it's 5, so be choosy on the ones you actually need.

## Supporting my job hunt

!!! info "What this does"
    In order to leverage the Free Tier without creating Custom Objects, you have to think of Standard Objects a little differently. My thought was to leverage Products as Jobs - the below is what I did to make that happen.


| What | Where | Name | Info |
| :--: | :--: | :--- | :--- |
| Process | Sales | Customer | Standard Opp Process |
| | | Job Hunt | Specific to job hunting |
| Pg Layout | Opportunity | Customer | Semi-custom version of the standard Opp Layout |
| | | Interview | Specific to job hunting |
| Lt Rec Pg | Opportunity | Opp_Interview | Specific to job hunting |
| Picklist | Opportunity | Source_Interview| Specific to job hunting<br>Show what you like, but I have the Products Related List as a Related List (Basic List) - Single and only showing the Product and the Product Description (Long). Yes, this is... large... but it shows the data I'm after. |
| | Opportunity | Interview Stages | Applied (0%) [Omitted]<br>Phone Screen (10%)<br>1st Round (25%)<br>2nd Round(50%)<br>Final Round (75%)<br>Standard Closed Won/Lost |
| Currency | Opportunity | Min Salary | Due to limitations I can't cram this in via Product or Price Book Entry, and since the Opp is for only one Product, this seems workable |
| | | Max Salary | See above |
| Lookup | Opportunity | Initial Contact | This is more for Recruiters, but this reminds me who I should be looking for in email and/or LinkedIn, etc. |
| Long Text | Product | Description | 32,768 characters. This is for the Job Role info |
| Long Text | Opportunity Product | Product Description (Long) | 32,768 characters. This is for a Flow to push from Product to here |
| Flow | Record-Trigger | Look here -> | NAME: Opp Line Item - After Create - OLI Desc from Prod Desc<br>DESC: When an Opportunity Product is added, it will take the Description from the Product and put it into the (Long) field on the Opp Product<br>- Trigger the Flow When: A record is created<br>- Update Product Description (Long) from OppLineItm > PID > Description |

#### Example of Interview Opportunity
![Interview Opp](../../assets/images/sfdc-free-opp-interview.png)

!!! tip "To Do"
    - Add Min / Max Range to Product and Opportunity for Job Products<br>
    - Add Contract/FTE/Hybrid/Onsite to Product/Opp

