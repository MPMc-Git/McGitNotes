Pulled from various sources, including Salesforce.com; I like to collect info :)<br />

##### Annotations
| Annotation | Description | Example |
|:-----------|:------------|:--------|
| @future | Denotes methods that are executed asynchronously | global class MyFutureClass { @future<br />static void myMethod( String a, Integer i) { System.debug( 'Method called with: ' + a + ' and ' + i);<br /> // do callout, other long running code }} |

