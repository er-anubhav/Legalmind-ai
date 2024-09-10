### About DummyCase_Data.csv
See, we are assuming that courts and justice body has a database which contains info such as case number and other relevant case details.
so, ```DummyCase_Data.csv``` is a dummy replica of that database which is utilized by our software to fetch and display data,
and also performing ML functions such as ```Summarizing```, ```Showing Similar Cases```, ```Legal Traslations```, ```Cases by Categories``` etc.

### About Backup.py 
Ok, If in worst case the complete code gets crashed, backup.py can atleast generate and showcase summary.
But one needs to create a static folder in root directory and inside the static should be ```index.html``` which can fetch summary sent at ```/summarize``` route.