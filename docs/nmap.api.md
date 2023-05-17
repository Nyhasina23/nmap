## NMAP API

**USER AUTHENTICATION**

> POST /signin && POST /signup

Body Parameters :

    - username ( string )
    - password ( string )

**USER SCAN REQUEST**

GET USER OWNER REQUEST - HISTORY OF USER REQUEST

> GET /request/user

Query parameter :

    - owner_id ( string)

SCAN REQUEST WITH NMAP

> POST /request/scan

Body parameters : 
    - host (string)
    - scanType (string)
    - maxRetries (string)
    - hostTimeout (string)
    - port (string)
    - owner (ID of the user who send a request)

**REQUESTS**

GET ALL REQUEST PASSED

> GET /requests
