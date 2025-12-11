## Salesforce.com Free Tier Notes

!!! abstract
    I have a free tier environment. VERY limited. This is just me trying to make it usable and a very pretty rolodex :smile:

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
| Picklist | Opportunity | Source_Interview| Specific to job hunting |
| | Opportunity | Interview Stages | Phone Screen (10%)<br>1st Round (25%)<br>2nd Round(50%)<br>Final Round (75%)<br>Standard Closed Won/Lost |
| Long Text | Product | Description | 32,768 characters. This is for the Job Role info |
| Long Text | Opportunity Product | Product Description (Long) | 32,768 characters. This is for a Flow to push from Product to here |
| Flow | Record-Trigger | Look here -> | Opp Line Item - After Create - OLI Desc from Prod Desc<br>When an Opportunity Product is added, it will take the Description from the Product and put it into the (Long) field on the Opp Product |
